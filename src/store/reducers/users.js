const initialState = {}

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        list: action.payload,
      }
    default:
      return state
  }
}

module.exports = reducer