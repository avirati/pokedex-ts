import { Action } from 'redux';

export interface IPokemonMoves {
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
  hide?: boolean;
  favorite?: boolean;
}

export interface IAppState {
  pokeList: IPokemon[];
}

export interface ICustomAction extends Action {
  type: string;
  payload?: any;
  meta?: any;
  error?: any;
}
