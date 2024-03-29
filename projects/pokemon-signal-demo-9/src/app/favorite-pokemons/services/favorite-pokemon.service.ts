import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of, switchMap } from 'rxjs';
import { Pokemon } from '../../pokemon/interfaces/pokemon.interface';
import { FavoritePokemon, PokemonSpecies } from '../interfaces/favorite-pokemon.interface';

const initialValue: FavoritePokemon = {
  id: -1,
  name: '',
  height: -1,
  weight: -1,
  backShiny: '',
  frontShiny: '',
  backShinyFemale: '',
  frontShinyFemale: '',
  color: '',
  shape: '',
  evolvesFromSpecies: '',
};

const favoritePokemonTransformer = (pokemon: Pokemon, species: PokemonSpecies): FavoritePokemon => {
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
    color: species?.color?.name ?? '',
    shape: species?.shape?.name ?? '',
    evolvesFromSpecies: species?.evolves_from_species?.name || '',
  }
}

@Injectable({
  providedIn: 'root'
})
export class FavoritePokemonService {
  private readonly httpClient = inject(HttpClient);
  
  private readonly favoritePokemonSignal = signal('');
  private readonly favoritePokemon$ =  toObservable(this.favoritePokemonSignal)
    .pipe(
      switchMap((idOrName) => this.httpClient.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${idOrName}`)),
      switchMap((pokemon) => 
        this.httpClient.get<PokemonSpecies>(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`)
          .pipe(
            map((species) => favoritePokemonTransformer(pokemon, species)),
            catchError((err) => {
              console.error(err);
              return of(initialValue);
            }),
          )
      ),
    );
    
  favoritePokemon = toSignal(this.favoritePokemon$, { initialValue });

  personalData = computed(() => {
    const { id, name, height, weight, shape, color, evolvesFromSpecies } = this.favoritePokemon();
    return {
      physicalAttributes: [
        { text: 'Id: ', value: id },
        { text: 'Name: ', value: name },
        { text: 'Height: ', value: height },
        { text: 'Weight: ', value: weight },
        { text: 'Color: ', value: color },
        { text: 'Shape: ', value: shape }
      ],
      evolveFrom: evolvesFromSpecies,
    };
  });

  updateFavoritePokemonSub(inputIdOrName:  string) {
    this.favoritePokemonSignal.set(inputIdOrName); 
  }
}
