import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, filter, map, switchMap } from 'rxjs';
import { Ability, DisplayPokemon, Pokemon, Statistics } from '../interfaces/pokemon.interface';

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
export class FavoritePokemonService {
  private readonly httpClient = inject(HttpClient);

  private readonly favoritePokemonSub = new BehaviorSubject('');
  private readonly favoritePokemon$ =  this.favoritePokemonSub
    .pipe(
      filter((input) => !!input),
      switchMap((idOrName) => this.httpClient.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${idOrName}`)),
      map((pokemon) => pokemonTransformer(pokemon))
    );
  favoritePokemon = toSignal(this.favoritePokemon$, { initialValue });

  personalData = computed(() => {
    const { id, name, height, weight } = this.favoritePokemon();
    return [
      { text: 'Id: ', value: id },
      { text: 'Name: ', value: name },
      { text: 'Height: ', value: height },
      { text: 'Weight: ', value: weight },
    ];
  });

  updateFavoritePokemonSub(input:  string) {
    this.favoritePokemonSub.next(input); 
  }
}
