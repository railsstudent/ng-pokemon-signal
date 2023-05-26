import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Observable, Subject, map, switchMap } from 'rxjs';
import { FlattenPokemon, Pokemon } from '../interfaces/pokemon.interface';

const EMPTY_POKEMON: FlattenPokemon = {
  id: -1,
  name: '',
  height: -1,
  weight: -1,
  back_shiny: '',
  front_shiny: '',
  abilities: [],
  stats: [],
};

const retrievePokemonFn = () => {
  const httpClient = inject(HttpClient);
  return (id: number) => httpClient.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`);
}

const pokemonTransformer = (pokemon: Pokemon) => {
  const abilities = pokemon.abilities.map((ability) => ({
    name: ability.ability.name,
    is_hidden: ability.is_hidden
  }));

  const stats = pokemon.stats.map((stat) => ({
    name: stat.stat.name,
    effort: stat.effort,
    base_stat: stat.base_stat,
  }));

  return {
    id: pokemon.id,
    name: pokemon.name,
    height: pokemon.height,
    weight: pokemon.weight,
    back_shiny: pokemon.sprites.back_shiny,
    front_shiny: pokemon.sprites.front_shiny,
    abilities,
    stats,
  }
} 

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly pokemonIdSub = new BehaviorSubject(1);
  private retrievePokemon = retrievePokemonFn();
  private readonly pokemon$: Observable<FlattenPokemon> =  this.pokemonIdSub
    .pipe(
      switchMap((id) => this.retrievePokemon(id)),
      map((pokemon) => pokemonTransformer(pokemon))
    );
  pokemon = toSignal(this.pokemon$, { initialValue: EMPTY_POKEMON });

  updatePokemonId(pokemonId: number) {
    this.pokemonIdSub.next(pokemonId); 
  }

  updatePokemonIdByDelta(input: { delta: number; min: number; max: number }) {
    const potentialId = this.pokemonIdSub.getValue() + input.delta;
    const newId = Math.min(input.max, Math.max(input.min, potentialId));
    this.pokemonIdSub.next(newId); 
  }
}
