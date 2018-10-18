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
  addCardDecks = this.props.navigation.state.params.addCard

  render() {
    console.log('addCard Component', this.state)
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
        
        <TouchableOpacity onPress={() => this.addCardCall()}>
          <Text>Add Question to Deck</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }

  addCardCall() {
    console.log(this.deck.name, this.state.question, this.state.answer)
    this.addCardDecks(this.deck.name, this.state.question, this.state.answer)
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