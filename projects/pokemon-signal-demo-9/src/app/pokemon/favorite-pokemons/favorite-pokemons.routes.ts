import { Route } from '@angular/router';
import { PageNotFoundComponent } from '../../page-not-found/page-not-found.component';
import { FavoritePokemonsComponent } from './favorite-pokemons.component';

export const favoritePokemonsRoutes: Route[] = [{
    path: '',
    component: FavoritePokemonsComponent,
    children: [
        { path: ':id', component: PageNotFoundComponent  },
    ], 
}];
