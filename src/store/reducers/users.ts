import { Reducer } from "../../types";

const initialState = {
  list: []
}

const reducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        list: state.list.concat(action.payload),
      }
    default:
      return state
  }
}

export default reducer