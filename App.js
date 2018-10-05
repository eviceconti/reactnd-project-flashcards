import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation'
import { purple, white, blue, yellow, gray } from './utils/colors'
import Decks from './components/decks';

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

export default class App extends React.Component {
  render() {
    return (
      <Tabs />
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
