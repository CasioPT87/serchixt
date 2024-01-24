import { combineReducers } from 'redux'
import articleReducer from './reducers/articles.js'
import userReducer from './reducers/users.js'


export const combinedStoreReducers = combineReducers({
    article: articleReducer,
    user: userReducer,
})