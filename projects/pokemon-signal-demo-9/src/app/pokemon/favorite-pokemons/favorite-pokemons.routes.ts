import { Route } from '@angular/router';
import { FavoritePokemonComponent } from '../favorite-pokemon/favorite-pokemon.component';
import { FavoritePokemonsComponent } from './favorite-pokemons.component';
import { favoritePokemonResolver } from './favorite-pokemon.resolver';

export const favoritePokemonsRoutes: Route[] = [{
    path: '',
    component: FavoritePokemonsComponent,
    children: [
        { 
            path: ':id', 
            component: FavoritePokemonComponent  
        },
        { 
            path: 'pikachu', 
            component: FavoritePokemonComponent,
            resolve: {
                pokemon: favoritePokemonResolver,
            }
        },
        { 
            path: 'jigglypuff', 
            component: FavoritePokemonComponent,
            resolve: {
                pokemon: favoritePokemonResolver,
            }
        },
        { 
            path: 'meowth', 
            component: FavoritePokemonComponent,
            resolve: {
                pokemon: favoritePokemonResolver,
            } 
        },
    ], 
}];
