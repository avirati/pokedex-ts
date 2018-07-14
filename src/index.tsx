import './index.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './core/sagas';

import App from './App';
import { IPokemon } from './core/Interfaces';
import reducer from './core/reducer';
import { composeEnhancers } from './core/utils';
import registerServiceWorker from './registerServiceWorker';

const db: IPokemon[] = require('./dump.json');

const sagaMiddleware = createSagaMiddleware();

function configureStore(initialState?: object) {
  // configure middlewares
  const middlewares = [sagaMiddleware];
  // compose enhancers
  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  // create store
  return createStore(reducer, initialState!, enhancer);
}

const store = configureStore({
  pokeList: db,
});

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
document.getElementById('root') as HTMLElement);
registerServiceWorker();
