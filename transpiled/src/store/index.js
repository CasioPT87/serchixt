"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUpStore = void 0;
const redux_1 = require("redux");
const redux_thunk_1 = require("redux-thunk");
const extension_1 = require("@redux-devtools/extension");
const reducers_1 = require("./reducers");
const defaultState = {};
const composedEnhancer = (0, extension_1.composeWithDevTools)((0, redux_1.applyMiddleware)(redux_thunk_1.thunk));
const setUpStore = (initialState = defaultState) => {
    return (0, redux_1.createStore)(reducers_1.combinedStoreReducers, Object.assign(Object.assign({}, defaultState), initialState), composedEnhancer);
};
exports.setUpStore = setUpStore;
