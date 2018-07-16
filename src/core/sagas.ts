import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

import * as ApiUrls from './ApiUrls';
import { ICustomAction, IPokemon } from './Interfaces';
import * as Types from './types';
import { extractPokemonIdFromUrl } from './utils';

export function* fetchMoreDetails(action: ICustomAction) {
 try {
  const response = yield call(axios.get, ApiUrls.fetchMoreDetailsUrl(action.payload.pokemonId));
  yield put({
    payload: {
      pokemonId: action.payload.pokemonId,
      researchData: response.data,
    },
    type: Types.FETCH_MORE_DETAILS_SUCCESS,
  });
 } catch (e) {
  yield put({
    payload: e,
    type: Types.FETCH_MORE_DETAILS_FAILED,
  });
 }
}

export function* fetchPokemonList(action: ICustomAction) {
  try {
    const { limit, offset} = action.payload;
    const response = yield call(axios.get, ApiUrls.fetchPokemonListUrl(limit, offset));
    yield put({
      payload: {
        newList: response.data.results.map((pokemon: IPokemon) => {
          pokemon.id = extractPokemonIdFromUrl(pokemon.url);
          return pokemon;
        }),
      },
      type: Types.FETCH_POKEMON_LIST_SUCCESS,
    });
   } catch (e) {
    yield put({
      payload: e,
      type: Types.FETCH_POKEMON_LIST_FAILED,
    });
   }
}

export default function* rootSaga() {
  yield takeEvery(Types.FETCH_MORE_DETAILS, fetchMoreDetails);
  yield takeEvery(Types.FETCH_POKEMON_LIST, fetchPokemonList);
}
