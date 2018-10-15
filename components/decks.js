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
    console.log('render',this.state)
    return (
      <View style={styles.container}>
        {(this.state.decks !== null) && this.state.decks.map((deck, i) => (
          <View key={deck.name} style={styles.card}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate(
                'Deck',
                { deck: this.state.decks[i] }
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

    const asyncKeys = AsyncStorage.getAllKeys()

    if (!asyncKeys.decks) {
      AsyncStorage.setItem('decks', JSON.stringify({ decks: initialDecks }))
    }

    AsyncStorage.getItem('decks')
      .then(response => {
        console.log('response',response)
        const decks = JSON.parse(response)
        console.log('decks',decks)
        this.setState({ decks: decks.decks })
      })
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