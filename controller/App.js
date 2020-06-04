import React, { Component } from 'react';
import { View } from 'react-native';
import ConsoleScreen from './app/screens/ConsoleScreen';

export default class App extends Component {


  render() {
    return (
      <View>
       <ConsoleScreen></ConsoleScreen>
      </View>
    );
  }
}
