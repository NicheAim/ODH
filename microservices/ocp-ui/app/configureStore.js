/**
 * Create the store with dynamic reducers
 */

import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { createTransform } from 'redux-persist';
import { autoRehydrate, persistStore } from 'redux-persist-immutable';
import { asyncSessionStorage } from 'redux-persist/storages';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

function specialSerialize(inboundState, key) {
  console.log('specialSerialize (inboundState, key) {', inboundState);
  const serialized = JSON.stringify(inboundState);
  console.log('specialSerialize (inboundState, key) { serialized:', serialized);
  return serialized;
}

function specialDeserialize(outboundState, key) {
  console.log('specialDeserialize(outboundState, key) {', outboundState);
  const parsed = JSON.parse(outboundState);
  console.log('specialDeserialize(outboundState, key) { :', parsed);
}

let myTransform = createTransform(
  // transform state coming from redux on its way to being serialized and stored
  (inboundState, key) => specialSerialize(inboundState, key),
  // transform state coming from storage, on its way to be rehydrated into redux
  (outboundState, key) => specialDeserialize(outboundState, key),
  // configuration options
  { whitelist: ['context'] }
);

export default function configureStore(
  initialState = { rehydrated: false },
  history
) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  const enhancers = [applyMiddleware(...middlewares)];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // TODO Try to remove when `react-router-redux` is out of beta, LOCATION_CHANGE should not be fired more than once after hot reloading
          // Prevent recomputing reducers for `replaceReducer`
          shouldHotReload: false,
        })
      : compose;
  /* eslint-enable */

  // TODO: redux-persist is causing failures in unit tests, so it is being disabled in test environment until the issues can be resolved
  const testEnvironment = process.env.NODE_ENV === 'test';
  const storeEnhancers = [...enhancers];
  // enable autoRehydrate enhancer if not in test environment
  if (!testEnvironment) {
    // add autohydrate enchancer
    storeEnhancers.push(autoRehydrate({ log: false }));
  }
  const store = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(...storeEnhancers)
  );
  // initialize persistor if not in test environment
  if (!testEnvironment) {
    // persist store
    store.persistor = persistStore(
      store,
      { storage: asyncSessionStorage, transforms: [myTransform] },
      () => {
        console.log('rehydration complete');
      }
    );
  }

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return store;
}
