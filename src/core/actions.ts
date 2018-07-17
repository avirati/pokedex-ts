import * as Types from './types';

export const fetchMoreDetails = (pokemonId: number) => {
  return {
    payload: {
      pokemonId,
    },
    type: Types.FETCH_MORE_DETAILS,
  };
};

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

export const favoriteToggled = (pokemonId: number) => {
  return {
    payload: {
      pokemonId,
    },
    type: Types.FAVORITE_TOGGLED,
  };
};
