import { Route } from '@angular/router';

export const routes: Route[] = [
    {
      path: 'pokemon',
      loadComponent: () => import('./pokemon/pokemon/pokemon.component').then(c => c.PokemonComponent),
      title: 'Show First 100 Pokemon',
    },
    {
      path: 'favorite-pokemons',
      loadChildren: () => import('./favorite-pokemons/favorite-pokemons.routes').then(c => c.favoritePokemonsRoutes),
    },
    {
      path: '',
      pathMatch: 'full',
      loadComponent: () => import('./home/home.component').then(c => c.HomeComponent),
      title: 'Home',
    },
    {
      path: '**',
      loadComponent: () => import('./page-not-found/page-not-found.component').then(c => c.PageNotFoundComponent)
    }
];
