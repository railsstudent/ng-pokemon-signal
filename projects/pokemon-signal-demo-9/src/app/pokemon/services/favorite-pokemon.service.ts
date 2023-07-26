import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, filter, map, switchMap } from 'rxjs';
import { Ability, DisplayFavoritePokemon, DisplayPokemon, Pokemon, Statistics } from '../interfaces/pokemon.interface';

const initialValue: DisplayFavoritePokemon = {
  id: -1,
  name: '',
  height: -1,
  weight: -1,
  backShiny: '',
  frontShiny: '',
  backShinyFemale: '',
  frontShinyFemale: '',
  color: '',
};

const pokemonTransformer = (pokemon: Pokemon): DisplayFavoritePokemon => {
  const { id, name, height, weight, sprites } = pokemon;

  return {
    id,
    name,
    height,
    weight,
    backShiny: sprites.back_shiny,
    frontShiny: sprites.front_shiny,
    backShinyFemale: sprites.back_shiny_female ?? '',
    frontShinyFemale: sprites.front_shiny_female ?? '',
    color: '',
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
