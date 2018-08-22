import { Reducer } from 'redux';

import { FAVORITE_TOGGLED, FETCH_MORE_DETAILS_SUCCESS } from '../poke-card/duck/types';
import { IAppState, ICustomAction, IPokemon } from './Interfaces';
import { FETCH_POKEMON_LIST_SUCCESS, FILTER_POKEMON_LIST, TOGGLE_SAVED_SWITCH } from './types';

const initialState: IAppState = {
  favoriteToggleSwitch: false,
  pokeList: [],
};

const reducer: Reducer<IAppState> = (state: IAppState = initialState, action: ICustomAction): IAppState => {
  const pokeList = [...state.pokeList];
  switch (action.type) {
    case FETCH_MORE_DETAILS_SUCCESS:
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
    case FETCH_POKEMON_LIST_SUCCESS:
      return {
        ...state,
        pokeList: [
          ...pokeList,
          ...action.payload.newList,
        ],
      };

    case FILTER_POKEMON_LIST:
      const filteredPokemon = [...pokeList];
      const filterText = action.payload.filterText.toLowerCase();

      filteredPokemon.forEach((pokemon) => {
        pokemon.hide = pokemon.name.toLowerCase().indexOf(filterText) === -1;
      });
      return {
        ...state,
        pokeList: filteredPokemon,
      };

    case FAVORITE_TOGGLED:  // When we mark a pokemon as favorite
      const affectedObjects: Array<{index: number; pokemon: IPokemon}> = [];
      pokeList.forEach((pokemon, index) => {
        if (pokemon.id === action.payload.pokemonId) {
          affectedObjects.push({
            index,
            pokemon: {
              ...pokemon,
              favorite: !(pokemon.favorite),
            },
          });
        }
      });

      const updatedPokemonList = [...pokeList];
      affectedObjects.forEach((obj) => {
        updatedPokemonList[obj.index] = obj.pokemon;
      });

      return {
        ...state,
        pokeList: updatedPokemonList,
      };

    case TOGGLE_SAVED_SWITCH: // When we want to switch to all saved pokemon
      return {
        ...state,
        favoriteToggleSwitch: action.payload.toggledState,
      };
  }
  return state;
};

export default reducer;
