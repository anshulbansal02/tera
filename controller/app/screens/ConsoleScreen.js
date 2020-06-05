import React, { Component } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import { View, StyleSheet, StatusBar } from "react-native";

import Joystick from "../shared/components/Joystick";
import Switch from "../shared/components/Switch";
import MapView from "../shared/components/MapView";
import IconButton from "../shared/components/IconButton";

export default class ConsoleScreen extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		ScreenOrientation.lockAsync(
			ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
		);
	}

	render() {
		return (
			<View style={style.ConsoleScreen}>
				<StatusBar hidden />
				<View style={style.configsBtn}>
          <IconButton icon={require("../assets/gear.png")}></IconButton>
          <IconButton icon={require("../assets/signal.png")}></IconButton>
					<Switch onChange={(value) => console.log(value)}></Switch>
					<Switch onChange={(value) => console.log(value)}></Switch>
				</View>
				<MapView style={style.mapView} />
				<Joystick style={style.joystickLeft}></Joystick>
				<Joystick style={style.joystickRight}></Joystick>
			</View>
		);
	}
}

const style = StyleSheet.create({
	ConsoleScreen: {
		width: "100%",
		height: "100%",
		padding: 20,
	},

	joystickLeft: {
		position: "absolute",
		bottom: 40,
		left: 40,
	},

	joystickRight: {
		position: "absolute",
		bottom: 40,
		right: 40,
	},

	configsBtn: {
    flexDirection: "row",
    width: 230,
    justifyContent: "space-between"
	},

	mapView: {
		position: "absolute",
		right: 30,
		top: 30,
	},
});
