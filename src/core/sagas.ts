import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

import * as ApiUrls from './ApiUrls';
import { ICustomAction } from './Interfaces';
import * as Types from './types';

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

export default function* rootSaga() {
  yield takeEvery(Types.FETCH_MORE_DETAILS, fetchMoreDetails);
}
