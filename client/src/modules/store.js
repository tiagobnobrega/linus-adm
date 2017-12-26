import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { sagaMiddleware,initSagas } from './sagas-middleware'

import createHistory from 'history/createBrowserHistory';
import rootReducer from '../reducers/index';

//Create history object
export const history = createHistory();

//define initial state
const initialState = {};
//define enhancers
const enhancers = [];

//define middleware array
const middleware = [
  routerMiddleware(history),
  sagaMiddleware,
];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
);

initSagas();

export default store;
