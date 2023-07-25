import { Route } from '@angular/router';
import { FavoritePokemonComponent } from '../favorite-pokemon/favorite-pokemon.component';
import { FavoritePokemonsComponent } from './favorite-pokemons.component';


const favoritePokemons = [
    { path: 'pikachu', pokemonId: 25 },
    { path: 'jigglypuff', pokemonId: 39 },
    { path: 'meowth', pokemonId: 52 },
    { path: 'snorlax', pokemonId: 143 },
]

const childrenRoutes = favoritePokemons.map(({ path, pokemonId }) => {
    return {
        path,
        component: FavoritePokemonComponent,
        data: {
            pokemonId,
        },
    }
});

export const favoritePokemonsRoutes: Route[] = [{
    path: '',
    component: FavoritePokemonsComponent,
    children: [
        ...childrenRoutes,
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
