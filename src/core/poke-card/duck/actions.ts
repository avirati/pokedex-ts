import { FAVORITE_TOGGLED, FETCH_MORE_DETAILS } from './types';

export const favoriteToggled = (pokemonId: number) => {
  return {
    payload: {
      pokemonId,
    },
    type: FAVORITE_TOGGLED,
  };
};

export const fetchMoreDetails = (pokemonId: number) => {
  return {
    payload: {
      pokemonId,
    },
    type: FETCH_MORE_DETAILS,
  };
};
