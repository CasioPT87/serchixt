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
const composedEnhancer = composeWithDevTools()

 const setUpStore = (initialState = {}) => {
  return createStore(
    combinedStoreReducers,
    { ...defaultState, ...initialState },
    composedEnhancer
  )
}

export { setUpStore }