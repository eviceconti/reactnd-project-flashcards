import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { purple, white, red, black, gray } from '../utils/colors'
import { Dimensions } from 'react-native';


export default class Decks extends Component {
  deck = this.props.navigation.state.params.deck

  render() {
    console.log(this.deck);
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>
            {this.deck.name}
          </Text>
          <Text style={styles.text}>
            {this.deck.cards.length} Cards
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate(
            'Quiz',
            { cards: this.deck.cards }
          )}
        >
          <Text>Quiz</Text>
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