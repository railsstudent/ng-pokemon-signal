import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { map } from "rxjs";
import { DisplayPokemon, Pokemon } from "./interfaces/pokemon.interface";

export const retrievePokemonFn = () => {
  const httpClient = inject(HttpClient);
  return (id: number) => httpClient.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .pipe(map((pokemon) => pokemonTransformer(pokemon)));
}

const pokemonTransformer = (pokemon: Pokemon): DisplayPokemon =>
  ({
    id: pokemon.id,
    name: pokemon.name,
    height: pokemon.height,
    weight: pokemon.weight,
    back_shiny: pokemon.sprites.back_shiny,
    front_shiny: pokemon.sprites.front_shiny,
  });
