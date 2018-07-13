import './index.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import App from './App';
import { IPokemon } from './core/Interfaces';
import reducer from './core/reducer';
import { composeEnhancers } from './core/utils';
import registerServiceWorker from './registerServiceWorker';

const db: IPokemon[] = require('./dump.json');

function configureStore(initialState?: object) {
  // configure middlewares
  const middlewares = [thunk];
  // compose enhancers
  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  // create store
  return createStore(reducer, initialState!, enhancer);
}

const store = configureStore({
  pokeList: db,
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
document.getElementById('root') as HTMLElement);
registerServiceWorker();
