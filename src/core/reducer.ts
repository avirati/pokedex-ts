import { Reducer } from 'redux';
import { IAppState, ICustomAction } from './Interfaces';

const initialState: IAppState = {
  pokeList: [],
};

const reducer: Reducer<IAppState> = (state: IAppState = initialState, action: ICustomAction): IAppState => {
  return state;
};

export default reducer;
