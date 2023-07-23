import { Signal, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router, RouterStateSnapshot } from '@angular/router';
import { DisplayPokemon } from '../interfaces/pokemon.interface';
import { PokemonService } from '../services/pokemon.service';

export const favoritePokemonResolver: ResolveFn<Signal<DisplayPokemon>> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const pokemonService = inject(PokemonService);
    const router = inject(Router);

    const id = router.getCurrentNavigation()?.extras?.state?.['id'] || 1;
    console.log('id', id);

    pokemonService.updatePokemonId(id);

    return pokemonService.pokemon;
}