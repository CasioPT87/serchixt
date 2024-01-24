import { createStore, applyMiddleware } from'redux'
// import { ThunkMiddleware } from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension'
import { combinedStoreReducers } from './reducers'

const defaultState = {
    articles: {
      list: {},
    },
    users: []
}

// const composedEnhancer = composeWithDevTools(applyMiddleware(ThunkMiddleware))

export const setUpStore = (initialState = {}) => {
  return createStore(
    combinedStoreReducers,
    { ...defaultState, ...initialState },
    // composedEnhancer
  )
}