import { Reducer } from 'redux';

import { IAppState, ICustomAction } from './Interfaces';
import * as Types from './types';

const initialState: IAppState = {
  pokeList: [],
};

const reducer: Reducer<IAppState> = (state: IAppState = initialState, action: ICustomAction): IAppState => {
  const pokeList = [...state.pokeList];
  switch (action.type) {
    case Types.FETCH_MORE_DETAILS_SUCCESS:
      pokeList.forEach((pokemon) => {
        const payload = action.payload;
        if (pokemon.id === payload.pokemonId) {
          pokemon.researchData = action.payload.researchData;
        }
      });
      return { pokeList };
    case Types.FETCH_POKEMON_LIST_SUCCESS:
      return {
        pokeList: [
          ...pokeList,
          ...action.payload.newList,
        ],
      };
  }
  return state;
};

export default reducer;
