import { Injector, inject } from '@angular/core';
import { POKEMON_TOKEN } from '../constants/pokemon.constant';
import { DisplayPokemon } from '../interfaces/pokemon.interface';

export const createPokemonInjectorFn = () => {
    const injector = inject(Injector);
    return (pokemon: DisplayPokemon) =>
        Injector.create({
            providers: [{ provide: POKEMON_TOKEN, useValue: pokemon }],
            parent: injector
        });
}
