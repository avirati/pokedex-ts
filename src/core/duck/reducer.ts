import { Reducer } from 'redux';
import { replaceAtPosition } from '../utils';

import { FAVORITE_TOGGLED, FETCH_MORE_DETAILS_SUCCESS } from '../poke-card/duck/types';
import { IAppState, ICustomAction, IPokemon } from './Interfaces';
import { FETCH_POKEMON_LIST_SUCCESS, FILTER_POKEMON_LIST, TOGGLE_SAVED_SWITCH } from './types';

const initialState: IAppState = {
  favoriteToggleSwitch: false,
  pokeList: [],
};

const reducer: Reducer<IAppState> = (state: IAppState = initialState, action: ICustomAction): IAppState => {
  const pokeList = state.pokeList;
  switch (action.type) {
    case FETCH_MORE_DETAILS_SUCCESS: {
      const pokemonIndexToUpdate = pokeList.findIndex((pokemon: IPokemon) => {
        return pokemon.id === action.payload.pokemonId;
      });
      const pokemonToUpdate = pokeList[pokemonIndexToUpdate];
      if (!pokemonToUpdate) {
        return state;
      }
      const updatedPokemon = {
        ...pokemonToUpdate,
        researchData: action.payload.researchData,
      };

      const updatedPokemonList = replaceAtPosition(pokeList, updatedPokemon, pokemonIndexToUpdate);

      return {
        ...state,
        pokeList: updatedPokemonList,
      };
    }
    case FETCH_POKEMON_LIST_SUCCESS:
      return {
        ...state,
        pokeList: [
          ...pokeList,
          ...action.payload.newList,
        ],
      };

    case FILTER_POKEMON_LIST: {
      const filterText = action.payload.filterText.toLowerCase();

      const matches = pokeList
                      .map((pokemon) => { // We need to alter all pokemon so that the hidden pokemon do not stay hidden always
                        return {
                          ...pokemon,
                          hide: pokemon.name.toLowerCase().indexOf(filterText) === -1,
                        };
                      });

      return {
        ...state,
        pokeList: matches,
      };
    }

    case FAVORITE_TOGGLED:  {// When we mark a pokemon as favorite
      const favoriteToggledPokemonIndex: number = pokeList.findIndex((pokemon) => pokemon.id === action.payload.pokemonId);
      const favoriteToggledPokemon = pokeList[favoriteToggledPokemonIndex];

      if (!favoriteToggledPokemon) {
        return state;
      }

      const updatedPokemon = {
        ...favoriteToggledPokemon,
        favorite: !(favoriteToggledPokemon.favorite),
      };
      const updatedPokemonList = replaceAtPosition(pokeList, updatedPokemon, favoriteToggledPokemonIndex);

      return {
        ...state,
        pokeList: updatedPokemonList,
      };
    }

    case TOGGLE_SAVED_SWITCH: // When we want to switch to all saved pokemon
      return {
        ...state,
        favoriteToggleSwitch: action.payload.toggledState,
      };
  }
  return state;
};

export default reducer;
