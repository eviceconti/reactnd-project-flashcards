import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, TextInput, AsyncStorage } from 'react-native'
import { purple, white, red, black, gray } from '../utils/colors'
import { Dimensions } from 'react-native'

import { addDeck } from '../redux/actions/index'

class NewDeck extends Component {
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
          <Text>Add Deck</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }

  newDeckCall() {
    this.props.addDeck(this.state.title)
    this.props.navigation.navigate(
      'Deck', { 
        deck: { cards: [] },
        deckName: this.state.title,
      }
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addDeck: (deckName) => dispatch(addDeck(deckName)),
  }
}

export default connect(null, mapDispatchToProps)(NewDeck);

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