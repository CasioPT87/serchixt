"use strict";
const initialState = {
    list: []
};
const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case 'ADD_USER':
            return Object.assign(Object.assign({}, state), { list: state.list.concat(action.payload) });
        default:
            return state;
    }
};
module.exports = reducer;
