import * as Types from './types';

export const fetchMoreDetails = (pokemonId: number) => {
  return {
    payload: {
      pokemonId,
    },
    type: Types.FETCH_MORE_DETAILS,
  };
};
