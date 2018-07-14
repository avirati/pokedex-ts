import './index.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

import App from './App';
import { IPokemon } from './core/Interfaces';
import reducer from './core/reducer';
import rootSaga from './core/sagas';
import { composeEnhancers } from './core/utils';
import registerServiceWorker from './registerServiceWorker';

const db: IPokemon[] = require('./dump.json');

const sagaMiddleware = createSagaMiddleware();

function configureStore(initialState?: object) {
  const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['pokeList'],
  };

  const persistedReducer = persistReducer(persistConfig, reducer);
  // configure middlewares
  const middlewares = [sagaMiddleware];
  // compose enhancers
  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  // create store
  const store = createStore(persistedReducer, initialState!, enhancer);
  const persistor = persistStore(store);

  return { store, persistor };
}

const { store, persistor } = configureStore({
  pokeList: db,
});

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
document.getElementById('root') as HTMLElement);
registerServiceWorker();
