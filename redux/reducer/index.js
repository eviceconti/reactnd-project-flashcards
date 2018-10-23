import { SET_DECKS, ADD_CARD, ADD_DECK } from '../actions/index'

const initialState = {
  keys: [],
  decks: {}
}


export default reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DECKS :
      return {
        ...state,
        keys: action.payload.keys,
        decks: action.payload.decks
      }
    case ADD_CARD :
      const { deckName, question, answer } = action.payload
      console.log(deckName, question, answer, state)
      let newCards = [ ...state.decks[deckName].cards ]
      console.log(newCards)
      newCards.push({ question, answer })
      console.log(newCards)
      return {
        ...state,
        decks: {
          ...state.decks,
          [deckName]: {
            ...state.decks[deckName],
            cards: newCards
          }
        }
      }
    case ADD_DECK :
      const newDeckName = action.payload
      let newKeys = [ ...state.keys]
      newKeys.push(newDeckName)
      const newDecks = { 
        ...state.decks,
        [newDeckName]: { cards: [] }
      }
      console.log(state, newKeys, newDecks)
      return {
        ...state,
        keys: newKeys,
        decks: newDecks
      }
    default :
      return state
  }
}