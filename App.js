import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation'

const Decks = () => {
	return (
		<View>
      <Text>decks!</Text>
    </View>
  )
}

const NewDeck = () => {
	return (
		<View>
      <Text>new deck!</Text>
    </View>
  )
}

const Tabs = createBottomTabNavigator({
  Decks: {
    screen: Decks
  },
  NewDeck: {
    screen: NewDeck
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
  },
});
