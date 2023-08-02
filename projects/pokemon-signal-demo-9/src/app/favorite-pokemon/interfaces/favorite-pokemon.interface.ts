import { DisplayPokemon, Resource } from '../../pokemon/interfaces/pokemon.interface';

export type FavoritePokemon = Omit<DisplayPokemon, 'stats' | 'abilities'> & {
    backShinyFemale: string;
    frontShinyFemale: string;
    color: string;
    shape: string;
    evolvesFromSpecies: string;
}

export interface PokemonSpecies {
    id: number;
    shape: Resource;
    color: Resource;
    evolves_from_species: Resource;
}
