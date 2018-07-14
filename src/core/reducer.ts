import { Reducer } from 'redux';
import { IAppState, ICustomAction } from './Interfaces';
import * as Types from './types';

const initialState: IAppState = {
  pokeList: [],
};

const reducer: Reducer<IAppState> = (state: IAppState = initialState, action: ICustomAction): IAppState => {
  switch (action.type) {
    case Types.FETCH_MORE_DETAILS:
      const pokeList = [...state.pokeList];
      pokeList.forEach((pokemon) => {
        const payload = action.payload;
        if (pokemon.id === payload.pokemonId) {
          pokemon.name = 'Avinash';
        }
      });
      return { pokeList };
  }
  return state;
};

export default reducer;
