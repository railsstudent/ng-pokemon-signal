import { InjectionToken } from '@angular/core';
import { Ability, Statistics } from '../interfaces/pokemon.interface';

export const POKEMON_STATS_TOKEN = new InjectionToken<Statistics[]>('pokemon_stats_token');
export const POKEMON_ABILITY_TOKEN = new InjectionToken<Ability[]>('pokemon_ability_token');
