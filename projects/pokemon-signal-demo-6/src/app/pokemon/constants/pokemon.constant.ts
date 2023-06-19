import { InjectionToken } from '@angular/core';
import { DisplayPokemon } from '../interfaces/pokemon.interface';

export const POKEMON_TOKEN = new InjectionToken<DisplayPokemon>('pokemon_token');
