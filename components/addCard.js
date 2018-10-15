import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, TextInput, AsyncStorage } from 'react-native'
import { purple, white, red, black, gray } from '../utils/colors'
import { Dimensions } from 'react-native'


export default class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  }

  deck = this.props.navigation.state.params.deck

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.title}>
          Question
        </Text>
        <TextInput 
          style={styles.text} 
          value={this.state.question} 
          onChangeText={(question) => this.setState({ question })}
        >
        </TextInput>
        <Text style={styles.title}>
          Answer
        </Text>
        <TextInput 
          style={styles.text} 
          value={this.state.answer} 
          onChangeText={(answer) => this.setState({ answer })}
        >
        </TextInput>
        
        <TouchableOpacity onPress={() => this.addCard()}>
          <Text>Add Question to Deck</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }

  addCard() {
    this.deck.cards.push(this.state)
    console.log('cards after push', this.deck.cards)
    AsyncStorage.mergeItem(this.deck.name, JSON.stringify(this.deck))
      .then(response => {
        console.log('response', response)
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
  title: {
    fontSize: 22,
    color: black,
    margin: 10
  },
  text: {
    fontSize: 14,
    color: gray,
    width: 200,
    height: 44,
    padding: 8,
    borderWidth: 1,
    borderColor: gray,
    margin: 10
  }
});