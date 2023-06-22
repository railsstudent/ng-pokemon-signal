import { Injector, inject } from '@angular/core';
import { POKEMON_ABILITY_TOKEN, POKEMON_STATS_TOKEN } from '../../constants/pokemon.constant';
import { DisplayPokemon } from '../../interfaces/pokemon.interface';

export const createPokemonInjectorFn = () => {
    const injector = inject(Injector);
    return (pokemon: DisplayPokemon) =>
        Injector.create({
            providers: [
                { provide: POKEMON_STATS_TOKEN, useValue: pokemon.stats },
                { provide: POKEMON_ABILITY_TOKEN, useValue: pokemon.abilities },            
            ],
            parent: injector
        });
}
