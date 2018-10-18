import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import { purple, white, red, black, gray } from '../utils/colors'
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window')

export default class Decks extends Component {
  state = {
    decks: null
  }

  render() {
    console.log('render decks component', this.state, this.props.state)
    return (
      <View style={styles.container}>
        {(this.state.decks !== null) && this.state.decks.map((deck, i) => (
          <View key={deck.name} style={styles.card}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate(
                'Deck', { 
                  deck: this.state.decks[i],
                  addCard: this.addCard
                }
              )}
            >
              <Text style={styles.title}>
                {deck.name}
              </Text>
              <Text style={styles.text}>
                {deck.cards.length} Cards
              </Text>
              </TouchableOpacity>
          </View>
        ))}
      </View>   
    )
  }

  componentDidMount() {
    //AsyncStorage.clear()
    const initialDecks = [
      {
        name: 'JavaScript',
        cards: [
          {
            question: 'What is the best Programming Language',
            answer: 'Javascript'
          },
          {
            question: 'What is the best Library for JS',
            answer: 'React and React Native'
          },
        ]
      }
    ]

    AsyncStorage.getAllKeys()
      .then(keys => {
        const asyncKeys = keys
        console.log('keys', asyncKeys)
        if (!asyncKeys.decks) {
          AsyncStorage.setItem('decks', JSON.stringify({ decks: initialDecks }))
          this.setState({ decks: initialDecks })
        } else {
          AsyncStorage.getItem('decks')
            .then(decks => {
              this.setState({ decks: decks })
            })
        }
      });
  }

  setItemsToAsyncStorage = (decks) => {
    AsyncStorage.setItem('decks', JSON.stringify({ decks: decks.decks }))
  }

  addCard = (deckName, question, answer) => {
    this.setState(prevState => {
      console.log('addCard function', deckName, question, answer, prevState)
      const deck = prevState.decks.filter(deck => deck.name === deckName)[0]
      console.log('deck',deck)
      deck.cards.push({ question, answer })
      console.log('deck',deck)
      const newStateDecks = { ...prevState }
      const index = newStateDecks.decks.map((deck, i) => {
        if (deck.name === deckName) { return i }
      })
      newStateDecks.decks[index] = deck
      console.log(newStateDecks)
      return newStateDecks
      })
    this.setItemsToAsyncStorage(this.state.decks)
    this.props.navigation.navigate('Home')
  }

  newDeck = (deckName) => {
    this.setState(prevState => {
      console.log('newCard function', deckName)
      const decks = prevState.decks.push({ name: deckName, cards: [] })
      console.log('decks',decks)
      return {
        ...prevState,
        decks
      }
    })
    this.setItemsToAsyncStorage(this.state.decks)
    this.props.navigation.navigate('Home')
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: width - 20,
    margin: 10,
    padding: 10,
    borderBottomWidth: 1.5,
    borderBottomColor: gray 
  },
  title: {
    fontSize: 22,
    color: black,
    margin: 10
  },
  text: {
    fontSize: 14,
    color: gray
  }
});