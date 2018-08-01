import axios from 'axios';
import { call, put } from 'redux-saga/effects';

import * as ApiUrls from '../../ApiUrls';
import { ICustomAction } from '../../duck/Interfaces';
import { FETCH_MORE_DETAILS_FAILED, FETCH_MORE_DETAILS_SUCCESS } from './types';

export function* fetchMoreDetails(action: ICustomAction) {
  try {
   const response = yield call(axios.get, ApiUrls.fetchMoreDetailsUrl(action.payload.pokemonId));
   yield put({
     payload: {
       pokemonId: action.payload.pokemonId,
       researchData: response.data,
     },
     type: FETCH_MORE_DETAILS_SUCCESS,
   });
  } catch (e) {
   yield put({
     payload: e,
     type: FETCH_MORE_DETAILS_FAILED,
   });
  }
 }
