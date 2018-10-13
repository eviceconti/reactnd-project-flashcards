import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { purple, white, blue, yellow, gray } from './utils/colors'
import Decks from './components/decks'
import Deck from './components/deck'
import Quiz from './components/quiz';

const NewDeck = () => {
	return (
		<View>
      <Text>new deck!</Text>
    </View>
  )
}

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
});

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
      title: `${navigation.state.params.deck.name}`,
    })
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({ navigation }) => ({
      title: `quiz`,
    })
  }
}, {
  // initialRouteName: 'Deck'
})

export default class App extends React.Component {
  render() {
    return (
      <MainNavigator />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
