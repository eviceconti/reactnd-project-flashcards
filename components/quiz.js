import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import { purple, white, red, black, gray } from '../utils/colors'
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
          <Text>
            Grade {this.state.userGrade} of {this.state.cards.length}
          </Text>
          <TouchableOpacity onPress={() => this.restartQuiz()}>
            <Text>Restart Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Text>Back to Deck</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Decks')}>
            <Text>Back to Home</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <View>
            <Text>
              Question {this.state.id + 1} / {this.state.cards.length}
            </Text>
          </View>
          <Animated.View style={{ opacity: questionOpacityValue }}>
            <Text style={styles.title}>
              {cards[id].question}
            </Text>
            <TouchableOpacity onPress={() => this.showAnswer()}>
              <Text>Show Answer</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={{ opacity: answerOpacityValue }}>
            <Text style={styles.title}>
              {cards[id].answer}
            </Text>
            <TouchableOpacity onPress={() => this.showQuestion(false)}>
              <Text>Show Question</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.answer(true)}>
              <Text>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.answer(false)}>
              <Text>Incorrect</Text>
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