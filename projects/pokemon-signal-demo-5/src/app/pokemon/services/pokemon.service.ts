import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, map, switchMap } from 'rxjs';
import { DisplayPokemon, Pokemon } from '../interfaces/pokemon.interface';
import { PokemonDelta } from '../interfaces/pokemon-control.interface';

const initialValue: DisplayPokemon = {
  id: -1,
  name: '',
  height: -1,
  weight: -1,
  backShiny: '',
  frontShiny: '',
  abilities: [],
  stats: [],
};

const pokemonTransformer = (pokemon: Pokemon): DisplayPokemon => {
  const abilities = pokemon.abilities.map(({ ability, is_hidden }) => ({
    name: ability.name,
    isHidden: is_hidden
  }));

  const stats = pokemon.stats.map(({ stat, effort, base_stat }) => ({
    name: stat.name,
    effort,
    baseStat: base_stat,
  }));

  const { id, name, height, weight, sprites } = pokemon;
  
  return {
    id,
    name,
    height,
    weight,
    backShiny: sprites.back_shiny,
    frontShiny: sprites.front_shiny,
    abilities,
    stats,
  }
} 

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly pokemonIdSub = new BehaviorSubject(1);
  private readonly httpClient = inject(HttpClient);

  private readonly pokemon$ =  this.pokemonIdSub
    .pipe(
      switchMap((id) => this.httpClient.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`)),
      map((pokemon) => pokemonTransformer(pokemon))
    );
  pokemon = toSignal(this.pokemon$, { initialValue });

  updatePokemonId(input: PokemonDelta | number) {
    if (typeof input === 'number') {
      this.pokemonIdSub.next(input); 
    } else {
      const potentialId = this.pokemonIdSub.getValue() + input.delta;
      const newId = Math.min(input.max, Math.max(input.min, potentialId));
      this.pokemonIdSub.next(newId); 
    }
  }
}
