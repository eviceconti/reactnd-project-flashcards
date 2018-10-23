//constants
export const SET_DECKS = 'SET_DECKS'
export const ADD_CARD = 'ADD_CARD'
export const ADD_DECK = 'ADD_DECK'

// actions
export const setDecks = (decks, keys) => {
  console.log(decks, keys)
  return {
    type: SET_DECKS,
    payload: { decks, keys }
  }
}

export const addCard = (deckName, question, answer) => {
  return {
    type: ADD_CARD,
    payload: { deckName, question, answer }
  }
}

export const addDeck = (deckName) => {
  return {
    type: ADD_DECK,
    payload: deckName
  }
}