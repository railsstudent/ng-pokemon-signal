import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';
import { PokemonDelta } from '../interfaces/pokemon-control.interface';
import { DisplayPokemon, Pokemon } from '../interfaces/pokemon.interface';

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
  private readonly pokemonId = signal(1);
  private readonly httpClient = inject(HttpClient);

  pokemon$ =  toObservable(this.pokemonId).pipe(
      switchMap((id) => this.httpClient.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`)),
      map((pokemon) => pokemonTransformer(pokemon))
    );

  updatePokemonId(input: PokemonDelta | number) {
    if (typeof input === 'number') {
      this.pokemonId.set(input);
    } else {
      this.pokemonId.update((value) => {
        const newId = value + input.delta;
        return Math.min(input.max, Math.max(input.min, newId));
      });
    }
  }
}
