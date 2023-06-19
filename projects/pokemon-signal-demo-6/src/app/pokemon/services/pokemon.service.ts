import { Injectable, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Subject, map, switchMap } from 'rxjs';
import { Ability, DisplayPokemon, Pokemon, Statistics } from '../interfaces/pokemon.interface';
import { HttpClient } from '@angular/common/http';
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
  const { id, name, height, weight, sprites, abilities: a, stats: statistics } = pokemon;

  const abilities: Ability[] = a.map(({ ability, is_hidden }) => ({
    name: ability.name,
    isHidden: is_hidden
  }));

  const stats: Statistics[] = statistics.map(({ stat, effort, base_stat }) => ({
    name: stat.name,
    effort,
    baseStat: base_stat,
  }));

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

  personalData = computed(() => {
    const { id, name, height, weight } = this.pokemon();
    return [
      { text: 'Id: ', value: id },
      { text: 'Name: ', value: name },
      { text: 'Height: ', value: height },
      { text: 'Weight: ', value: weight },
    ];
  });

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
