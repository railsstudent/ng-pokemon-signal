import { Injectable, inject } from '@angular/core';
import { Observable, Subject, map, switchMap } from 'rxjs';
import { FlattenPokemon, Pokemon } from '../interfaces/pokemon.interface';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly httpClient = inject(HttpClient);
  private readonly pokemonIdSub = new Subject<number>();
  private readonly pokemon$: Observable<FlattenPokemon> =  this.pokemonIdSub
    .pipe(
      switchMap((id) => this.httpClient.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`)),
      map((pokemon) => {
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
    )
  );
  pokemon = toSignal(this.pokemon$, { initialValue: {
      id: -1,
      name: '',
      height: -1,
      weight: -1,
      back_shiny: '',
      front_shiny: '',
      abilities: [],
      stats: [],
    } as FlattenPokemon
  })

  updatePokemonId(pokemonId: number) {
    this.pokemonIdSub.next(pokemonId); 
  }
}
