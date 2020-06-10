import React, { Component } from 'react';
import { View } from 'react-native';
import ConsoleScreen from './app/screens/ConsoleScreen';
import ConnectScreen from './app/screens/ConnectScreen';

export default class App extends Component {


  render() {
    return (
      <View>
       {/* <ConsoleScreen></ConsoleScreen> */}
      <ConnectScreen></ConnectScreen>
      </View>
    );
  }
}
