import { SET_DECKS } from '../actions/index'

const initialState = {
  decks: []
}


export default reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DECKS :
      return {
        ...state,
        decks: action.payload
      }
    default :
      return state
  }
}