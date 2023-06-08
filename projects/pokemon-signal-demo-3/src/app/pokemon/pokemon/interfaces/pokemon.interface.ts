export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: {
      back_shiny: string;
      front_shiny: string;
    }
}
  
export type DisplayPokemon = Omit<Pokemon, 'sprites'> & {
  back_shiny: string;
  front_shiny: string;
};
