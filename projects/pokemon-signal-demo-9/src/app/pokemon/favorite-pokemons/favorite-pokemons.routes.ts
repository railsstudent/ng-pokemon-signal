import { Route } from '@angular/router';
import { FavoritePokemonComponent } from '../favorite-pokemon/favorite-pokemon.component';
import { FavoritePokemonsComponent } from './favorite-pokemons.component';

export const favoritePokemonsRoutes: Route[] = [{
    path: '',
    component: FavoritePokemonsComponent,
    children: [
        { 
            path: 'pikachu', 
            component: FavoritePokemonComponent,
            data: {
                pokemonId: 25
            },
        },
        { 
            path: 'jigglypuff', 
            component: FavoritePokemonComponent,
            data: {
                pokemonId: 39
            },
        },
        { 
            path: 'meowth', 
            component: FavoritePokemonComponent,
            data: {
                pokemonId: 52
            },
        },
        { 
            path: 'snorlax', 
            component: FavoritePokemonComponent,
            data: {
                pokemonId: 143
            },
        },
        { 
            path: ':id', 
            component: FavoritePokemonComponent,
        },
        { 
            path: '**', 
            redirectTo: '', 
        },
    ], 
}];
