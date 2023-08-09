import { Route } from '@angular/router';
import { FavoritePokemonListComponent } from './favorite-pokemon-list/favorite-pokemon-list.component';
import { FavoritePokemonComponent } from './favorite-pokemon/favorite-pokemon.component';

const favoritePokemons = [
    { path: 'pikachu', pokemonId: 25 },
    { path: 'jigglypuff', pokemonId: 39 },
    { path: 'seaking', pokemonId: 119 },
    { path: 'snorlax', pokemonId: 143 },
]

const childrenRoutes: Route[] = favoritePokemons.map(({ path, pokemonId }) => {
    return {
        path,
        component: FavoritePokemonComponent,
        data: {
            pokemonId,
        }
    }
});

export const favoritePokemonsRoutes: Route[] = [{
    path: '',
    component: FavoritePokemonListComponent,
    children: [
        ...childrenRoutes,
        { 
            path: ':idOrName', 
            component: FavoritePokemonComponent,
        },
        { 
            path: '**', 
            redirectTo: '', 
        },
    ], 
}];
