import { Route } from '@angular/router';
import { FavoritePokemonComponent } from '../favorite-pokemon/favorite-pokemon.component';
import { FavoritePokemonsComponent } from './favorite-pokemons.component';

export const favoritePokemonsRoutes: Route[] = [{
    path: '',
    component: FavoritePokemonsComponent,
    children: [
        { path: ':id', component: FavoritePokemonComponent  },
    ], 
}];
