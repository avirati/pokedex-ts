import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

import * as ApiUrls from '../ApiUrls';
import { fetchMoreDetails } from '../poke-card/duck/sagas';
import { FETCH_MORE_DETAILS } from '../poke-card/duck/types';
import { extractPokemonIdFromUrl } from '../utils';
import { ICustomAction, IPokemon } from './Interfaces';
import * as Types from './types';

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
  yield takeEvery(FETCH_MORE_DETAILS, fetchMoreDetails);
  yield takeEvery(Types.FETCH_POKEMON_LIST, fetchPokemonList);
}
