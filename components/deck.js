import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { purple, white, red, black, gray, green } from '../utils/colors'
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window')

export default class Decks extends Component {
  deck = this.props.navigation.state.params.deck
  deckName = this.props.navigation.state.params.deckName
  addCard = this.props.navigation.state.params.addCard

  render() {
    console.log('render deck component',this.deck, this.deckName, this.addCard);
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>
            {this.deckName}
          </Text>
          <Text style={styles.text}>
            {this.deck.cards.length} Cards
          </Text>
        </View>
        {(this.deck.cards.length > 0) && (
          <TouchableOpacity
          style={styles.button2}
            onPress={() => this.props.navigation.navigate(
              'Quiz',
              { cards: this.deck.cards }
            )}
          >
            <Text style={styles.button2Text}>Quiz</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.button1}
          onPress={() => this.props.navigation.navigate(
            'AddCard',
            { deck: this.deck, deckName: this.deckName, addCard: this.addCard }
          )}
        >
          <Text style={styles.button1Text}>Add Question to Deck</Text>
        </TouchableOpacity>
      </View>
    )
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
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 40,
    color: black,
    margin: 10
  },
  text: {
    fontSize: 20,
    color: gray,
    textAlign: 'center',
  },
  button1: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
    margin: 12,
    backgroundColor: red,
    width: 300
  },
  button1Text: {
    color: gray,
    fontSize: 24,
    textAlign: 'center',
  },
  button2: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
    margin: 12,
    backgroundColor: green,
    width: 300
  },
  button2Text: {
    color: gray,
    fontSize: 24,
    textAlign: 'center',
  }
});