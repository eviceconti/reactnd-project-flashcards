import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native'
import { yellow, white, red, black, gray, green, blue } from '../utils/colors'
import { setLocalNotification, clearLocalNotification } from '../utils/notifications'


export default class Decks extends Component {
  state = {
    cards: this.props.navigation.state.params.cards,
    id: 0,
    userGrade: 0,
    showResult: false,
    questionOpacityValue: new Animated.Value(1),
    answerOpacityValue: new Animated.Value(0)
  }

  render() {
    const { cards, id, questionOpacityValue, answerOpacityValue } = this.state
    return ( 
      this.state.showResult 
      ? (
        <View style={styles.container}>
          <Text style={styles.title}>
            Grade {this.state.userGrade} of {this.state.cards.length}
          </Text>
          <TouchableOpacity style={styles.button1} onPress={() => this.restartQuiz()}>
            <Text style={styles.button1Text}>Restart Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2} onPress={() => this.props.navigation.goBack()}>
            <Text style={styles.button2Text}>Back to Deck</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonToggle} onPress={() => this.props.navigation.navigate('Decks')}>
            <Text style={styles.buttonToggleText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <View> style={styles.card}
            <Text style={styles.title}>
              Question {this.state.id + 1} / {this.state.cards.length}
            </Text>
          </View>
          <Animated.View style={{ opacity: questionOpacityValue, alignItems: 'center' }}>
            <Text style={styles.text}>
              {cards[id].question}
            </Text>
            <TouchableOpacity style={styles.buttonToggle} onPress={() => this.showAnswer()}>
              <Text style={styles.buttonToggleText}>Show Answer</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={{ opacity: answerOpacityValue, alignItems: 'center' }}>
            <Text style={styles.text}>
              {cards[id].answer}
            </Text>
            <TouchableOpacity style={styles.buttonToggle} onPress={() => this.showQuestion(false)}>
              <Text style={styles.buttonToggleText}>Show Question</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={() => this.answer(true)}>
              <Text style={styles.button2Text}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button1} onPress={() => this.answer(false)}>
              <Text style={styles.button1Text}>Incorrect</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )
    )
  }

  showAnswer() {
    Animated.timing(
      this.state.questionOpacityValue,
      { toValue: 0, duration: 300 }
    ).start()
    Animated.timing(
      this.state.answerOpacityValue,
      { toValue: 1, duration: 300 }
    ).start()
  }

  showQuestion(updateId) {
    Animated.timing(
      this.state.answerOpacityValue,
      { toValue: 0, duration: 300 }
    ).start()
    if (updateId && this.state.id + 1 < this.state.cards.length) {
      this.setState(state => ({
        ...state,
        id: state.id + 1
      }))
    }
    Animated.timing(
      this.state.questionOpacityValue,
      { toValue: 1, duration: 300 }
    ).start()
  }

  answer(userAnswer) {
    if (userAnswer) { 
      this.setState(state => ({
        ...state,
        userGrade: state.userGrade + 1
      }))
    }
    if (this.state.id + 1 >= this.state.cards.length) {
      this.setState({ showResult: true })
      //cancel notification after finish a quiz and set a new one for tomorrow
      clearLocalNotification()
        .then(setLocalNotification)
    }
    this.showQuestion(true)
  }

  restartQuiz() {
    this.showQuestion(false)
    this.setState({
      id: 0,
      userGrade: 0,
      showResult: false,
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
    margin: 20,
    padding: 10,
  },
  title: {
    fontSize: 40,
    color: black,
    margin: 10
  },
  text: {
    fontSize: 24,
    color: gray,
    textAlign: 'center',
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
    margin: 20,
    backgroundColor: green,
    width: 300
  },
  button2Text: {
    color: gray,
    fontSize: 24,
    textAlign: 'center',
  }
})