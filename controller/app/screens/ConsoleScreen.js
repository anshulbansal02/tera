import React, { Component } from 'react';
import Joystick from '../shared/components/Joystick';
import Switch from '../shared/components/Switch';


export default class ConsoleScreen extends Component {


  render() {
    return (
      <>
      {/* <Switch onChange={(value) => console.log(value)}></Switch>
      <Switch onChange={(value) => console.log(value)}></Switch> */}
        <Joystick></Joystick>
        </>
    );
  }
}
