import { Reducer } from '../../types';

const initialState = {
  list: [],
};

const reducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ARTICLES':
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
