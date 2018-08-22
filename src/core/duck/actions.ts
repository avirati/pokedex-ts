import * as Types from './types';

export const fetchPokemonList = (limit: number, offset: number) => {
  return {
    payload: {
      limit,
      offset,
    },
    type: Types.FETCH_POKEMON_LIST,
  };
};

export const filterPokemonList = (filterText: string) => {
  return {
    payload: {
      filterText,
    },
    type: Types.FILTER_POKEMON_LIST,
  };
};

export const showSavedPokemon = (toggledState: boolean) => {
  return {
    payload: {
      toggledState,
    },
    type: Types.TOGGLE_SAVED_SWITCH,
  };
};
