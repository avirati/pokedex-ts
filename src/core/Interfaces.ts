export interface IPokeListState {

}

export interface IPokeListProps {
  pokemonList: IPokemon[];
}

export interface IPokeCardProps {
  pokemonData: IPokemon;
}

interface IPokemonMoves {
  move: {
    name: string;
  };
}

interface IPokemonStats {
  stat: {
    name: string;
  };
  base_stat: number;
}

interface IPokemonResearchData {
  sprites: {
    front_default: string;
  };
  base_experience: number;
  height: number;
  weight: number;
  stats: IPokemonStats[];
  moves: IPokemonMoves[];
}

export interface IPokemon {
  id: number;
  url: string;
  name: string;
  researchData?: IPokemonResearchData;
}
