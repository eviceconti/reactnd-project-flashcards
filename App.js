import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'

import reducer from './redux/reducer/index'
import { white, blue, yellow, gray } from './utils/colors'
import { setLocalNotification } from './utils/notifications'
import Decks from './components/decks'
import Deck from './components/deck'
import Quiz from './components/quiz'
import AddCard from './components/addCard'
import NewDeck from './components/newDeck'

const store = createStore(reducer)

const Tabs = createBottomTabNavigator({
  Decks: {
    screen: Decks,
  },
  NewDeck: {
    screen: NewDeck
  }
}, {
  tabBarOptions: {
    activeTintColor: yellow,
    inactiveTintColor: gray,
    activeBackgroundColor: blue,
    inactiveBackgroundColor: white,
    style: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 40
    },
    labelStyle: {
      fontSize: 20,
    }
  }
})

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: () => ({
      title: 'FlashCards',
      headerTintColor: yellow,
      headerStyle: {
        backgroundColor: blue,
      }
    })
  },
  Deck: {
    screen: Deck,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.deckName}`,
      headerTintColor: yellow,
      headerStyle: {
        backgroundColor: blue,
      }
    })
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: () => ({
      title: 'Quiz',
      headerTintColor: yellow,
      headerStyle: {
        backgroundColor: blue,
      }
    })
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: ({ navigation }) => ({
      title: `Add Card to ${navigation.state.params.deckName} Deck`,
      headerTintColor: yellow,
      headerStyle: {
        backgroundColor: blue,
      }
    })
  }
}, {
  // initialRouteName: 'Deck'
})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    )
  }

  componentDidMount() {
    setLocalNotification()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
