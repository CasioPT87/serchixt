import { combineReducers } from 'redux'
import articleReducer from './reducers/articles'
import userReducer from './reducers/users'


export const combinedStoreReducers = combineReducers({
    article: articleReducer,
    user: userReducer,
})