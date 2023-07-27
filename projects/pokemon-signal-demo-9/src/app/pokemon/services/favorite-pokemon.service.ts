import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, catchError, map, of, switchMap } from 'rxjs';
import { FavoritePokemon, PokemonSpecies } from '../interfaces/favorite-pokemon.interface';
import { Pokemon } from '../interfaces/pokemon.interface';

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
    color: species.color.name,
    shape: species.shape.name,
    evolvesFromSpecies: species?.evolves_from_species?.name || '',
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
    const defaultData = [
      { text: 'Id: ', value: id },
      { text: 'Name: ', value: name },
      { text: 'Height: ', value: height },
      { text: 'Weight: ', value: weight },
      { text: 'Color: ', value: color },
      { text: 'Shape: ', value: shape }
    ];

    return evolvesFromSpecies ? 
      [...defaultData, { text: 'Evolution: ', value: evolvesFromSpecies } ] : defaultData;
  });

  updateFavoritePokemonSub(inputIdOrName:  string) {
    this.favoritePokemonSub.next(inputIdOrName); 
  }
}
