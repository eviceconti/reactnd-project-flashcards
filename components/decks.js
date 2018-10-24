import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, AsyncStorage, StatusBar } from 'react-native'

import { setDecks } from '../redux/actions/index'
import { white, black, gray } from '../utils/colors'
import { Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

class Decks extends Component {
  decks = {}
  keys = []

  render() {
    loading = (this.props.keys && this.props.keys.length > 0) ? false: true
    return (
      <ScrollView style={{backgroundColor: white}}>
      <StatusBar barStyle="light-content"/>
        <View style={styles.container}>
        {(!loading) && this.props.keys.map((key, i) => (
          <View key={i} style={[styles.card]}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate(
                'Deck', { 
                  deck: this.props.decks[key],
                  deckName: key,
                  addCard: this.addCard
                }
              )}
            >
              <Text style={styles.title}>
                {key}
              </Text>
              <Text style={styles.text}>
                {this.props.decks[key].cards.length} Cards
              </Text>
              </TouchableOpacity>
          </View>
        ))}
        </View>
        
      </ScrollView>   
    )
  }

  componentDidMount() {
    //Uncomment the next line to clear decks. This version don't implements the delete of cards
    //AsyncStorage.clear()
    const initialDecks = {
      'JavaScript': {
        cards: [
          {
            question: 'What is the best Programming Language',
            answer: 'Javascript'
          },
          {
            question: 'What is the best Library for JS',
            answer: 'React and React Native'
          },
        ]
      }
    }
    const initialKeys = ['JavaScript']

    AsyncStorage.getAllKeys()
      .then(keys => {
        const asyncKeys = keys
        let asyncDecks = false
        asyncKeys.map(key => {
          if (key === 'decks') {
            asyncDecks = true
          }
        })
        if (!asyncDecks) {
          AsyncStorage.setItem('decks', JSON.stringify(initialDecks))
          AsyncStorage.setItem('keys', JSON.stringify(initialKeys))
          this.props.setDecks(initialDecks, initialKeys)
        } else {
          AsyncStorage.getItem('decks')
            .then(resp => JSON.parse(resp))
            .then(decks => {
              this.decks = decks
            })
          AsyncStorage.getItem('keys')
          .then(resp => JSON.parse(resp))
            .then(keys => {
              this.keys = keys
              this.props.setDecks(this.decks, this.keys)
            })
        }
      })
  }

  componentDidUpdate() {
    AsyncStorage.setItem('decks', JSON.stringify(this.props.decks))
    AsyncStorage.setItem('keys', JSON.stringify(this.props.keys))
  }
}

// Redux.
function mapStateToProps(state) {
  return {
    keys: state.keys,
    decks: state.decks
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setDecks: (decks, keys) => dispatch(setDecks(decks, keys)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Decks)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center'
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
    color: gray,
    textAlign: 'center',
  }
})