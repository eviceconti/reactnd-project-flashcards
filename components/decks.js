import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation'
import { purple, white, red, black, gray } from '../utils/colors'
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window')

export default class Decks extends Component {
  state = {
    decks: [
      {
        name: 'Deck1',
        cards: [
          {
            question: 'Q1C1',
            answer: 'A1C1'
          },
          {
            question: 'Q2C1',
            answer: 'A2C1'
          },
        ]
      },
      {
        name: 'Deck2',
        cards: [
          {
            question: 'Q1C2',
            answer: 'A1C2'
          },
          {
            question: 'Q2C2',
            answer: 'A2C2'
          },
          {
            question: 'Q3C2',
            answer: 'A3C2'
          },
        ]
      }
    ]
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.decks.map(deck => (
          <View key={deck.name} style={styles.card}>
            <Text style={styles.title}>
              {deck.name}
            </Text>
            <Text style={styles.text}>
              {deck.cards.length} Cards
            </Text>
          </View>
        ))}
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