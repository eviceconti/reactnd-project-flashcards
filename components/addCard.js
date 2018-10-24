import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, TextInput } from 'react-native'
import { blue, white, yellow, black, gray } from '../utils/colors'

import { addCard } from '../redux/actions/index'


class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  }

  deck = this.props.navigation.state.params.deck
  deckName = this.props.navigation.state.params.deckName

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
        
        <TouchableOpacity style={styles.buttonToggle} onPress={() => this.addCardCall()}>
          <Text style={styles.buttonToggleText}>Add Question to Deck</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }

  addCardCall = () => {
    this.props.addCard(this.deckName, this.state.question, this.state.answer)
    this.props.navigation.navigate('Decks')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addCard: (deckName, question, answer) => dispatch(addCard(deckName, question, answer)),
  }
}

export default connect(null, mapDispatchToProps)(AddCard)

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
  },
  buttonToggle: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
    margin: 12,
    backgroundColor: yellow,
    width: 300
  },
  buttonToggleText: {
    color: blue,
    fontSize: 24,
    textAlign: 'center',
  },
})