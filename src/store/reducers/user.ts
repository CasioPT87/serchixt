import { Reducer } from "../../types";

const initialState = {
  data: null
}

const reducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        data: action.payload,
      }
    default:
      return state
  }
}

export default reducer