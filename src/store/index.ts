import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { combinedStoreReducers } from './reducers';

const defaultState = {};

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

const setUpStore = (initialState = defaultState): any => {
  return createStore(
    combinedStoreReducers,
    { ...defaultState, ...initialState },
    composedEnhancer
  );
};

export { setUpStore };
