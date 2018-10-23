import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from 'react-native'

import { setDecks } from '../redux/actions/index'
import { purple, white, red, black, gray } from '../utils/colors'
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window')

class Decks extends Component {

  render() {
    console.log('render decks component', this.props.decks, this.props.keys)
    loading = (this.props.keys && this.props.keys.length > 0) ? false: true
    return (
      <View style={styles.container}>
        {(!loading) && this.props.keys.map((key, i) => (
          <View key={i} style={styles.card}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate(
                'Deck', { 
                  deck: this.props.decks[key],
                  deckName: key,
                  addCard: this.addCard
                }
              )}
            >
              <Text style={styles.title}>
                {key}
              </Text>
              <Text style={styles.text}>
                {this.props.decks[key].cards.length} Cards
              </Text>
              </TouchableOpacity>
          </View>
        ))}
      </View>   
    )
  }

  componentDidMount() {
    AsyncStorage.clear()
    .then(() => {
      
    })
    const initialDecks = {
      'JavaScript': {
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
    }
    const initialKeys = ['JavaScript']

    AsyncStorage.getAllKeys()
      .then(keys => {
        const asyncKeys = keys
        console.log('keys', asyncKeys)
        if (!asyncKeys.decks) {
          AsyncStorage.setItem('decks', JSON.stringify(initialDecks))
          AsyncStorage.setItem('keys', JSON.stringify(initialKeys))
          this.props.setDecks(initialDecks, initialKeys)
        } else {
          AsyncStorage.getItem('decks')
            .then(decks => {
              this.props.setDecks(decks)
            })
          AsyncStorage.getItem('keys')
            .then(keys => {
              this.props.setDecks(keys)
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

// Redux.
function mapStateToProps(state) {
  return {
    keys: state.keys,
    decks: state.decks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setDecks: (decks, keys) => dispatch(setDecks(decks, keys)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Decks);

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