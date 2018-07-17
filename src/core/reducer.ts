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
      return {
        ...state,
        pokeList,
      };
    case Types.FETCH_POKEMON_LIST_SUCCESS:
      return {
        ...state,
        pokeList: [
          ...pokeList,
          ...action.payload.newList,
        ],
      };

    case Types.FILTER_POKEMON_LIST:
      const filteredPokemon = [...pokeList];
      const filterText = action.payload.filterText.toLowerCase();

      filteredPokemon.forEach((pokemon) => {
        pokemon.hide = pokemon.name.toLowerCase().indexOf(filterText) === -1;
      });
      return {
        ...state,
        pokeList: filteredPokemon,
      };

    case Types.FAVORITE_TOGGLED:
      const newList = [...pokeList];

      newList.forEach((pokemon) => {
        if (pokemon.id === action.payload.pokemonId) {
          pokemon.favorite = !(pokemon.favorite);
        }
      });
      return {
        ...state,
        pokeList: newList,
      };
  }
  return state;
};

export default reducer;
