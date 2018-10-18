import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, TextInput, AsyncStorage } from 'react-native'
import { purple, white, red, black, gray } from '../utils/colors'
import { Dimensions } from 'react-native'


export default class NewDeck extends Component {
  state = {
    title: ''
  }

  render() {
    console.log('newDeck Component', this.state)
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.title}>
          What is the title of your new Deck?
        </Text>
        <TextInput 
          style={styles.text} 
          value={this.state.title} 
          onChangeText={(title) => this.setState({ title })}
        />
        
        <TouchableOpacity onPress={() => this.newDeckCall()}>
          <Text>Add Question to Deck</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }

  newDeckCall() {
    console.log(this.state.title)
    //this.addCardDecks(this.deck.name, this.state.question, this.state.answer)
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