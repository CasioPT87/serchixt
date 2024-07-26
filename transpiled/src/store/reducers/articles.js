"use strict";
const initialState = {
    list: [],
};
const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case 'ADD_ARTICLES':
            return Object.assign(Object.assign({}, state), { list: action.payload });
        default:
            return state;
    }
};
module.exports = reducer;
//# sourceMappingURL=articles.js.map