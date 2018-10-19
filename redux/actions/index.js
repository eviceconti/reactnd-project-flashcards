//constants
export const SET_DECKS = 'SET_DECKS'
export const ADD_CARD = 'ADD_CARD'
export const ADD_DECK = 'ADD_DECK'

// actions
export const setDecks = (decks) => {
  return {
    type: SET_DECKS,
    payload: decks
  }
}

export const addCard = (cardName, question, answer) => {
  return {
    type: ADD_CARD,
    payload: { cardName, question, answer }
  }
}

export const addDeck = (deckName) => {
  return {
    type: ADD_DECK,
    payload: deckName
  }
}