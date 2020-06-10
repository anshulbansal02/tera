import React, { Component } from "react";
import {
	Text,
	View,
	TouchableNativeFeedback,
	StyleSheet,
	Image,
} from "react-native";
import Waves from "../shared/components/Waves";
import Button from "../shared/components/Button";

export default class ConnectScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			waveActive: false,
			discoverBtn: { text: "Discover on LAN", color: "#3679F5" },
			connectBtn: { text: "Add Manually", color: "#3679F5" },
			infoText:
				"Make sure the device server is up and running. Pair the device either by using server address or find server on local network.",
		};
	}

	// Handles onPress event of Discover button
	handleDiscover = () => {
		this.setState({
			discoverBtn: this.state.waveActive
				? { text: "Discover on LAN", color: "#3679F5" }
				: { text: "Stop Discovering", color: "#FF331F" },
			waveActive: !this.state.waveActive,
		});
	};

	// Handles onPress event of Manual button
	handleConnect = () => {};

	render() {
		return (
			<View style={style.connectScreen}>
				<Waves active={this.state.waveActive} />
				<Text style={style.info}>
					{this.state.infoText}
				</Text>

				<View>
					<Button
						onPress={this.handleDiscover}
						title={this.state.discoverBtn.text}
						style={[
							style.discoverBtn,
							{ backgroundColor: this.state.discoverBtn.color },
						]}
					/>
					<Text style={style.info}>OR</Text>
					<Button
						onPress={this.handleConnect}
						title={this.state.connectBtn.text}
						style={[
							style.connectBtn,
							{ backgroundColor: this.state.connectBtn.color },
						]}
					/>
				</View>
			</View>
		);
	}
}

const style = StyleSheet.create({
	connectScreen: {
		justifyContent: "space-evenly",
		alignItems: "center",
		height: "100%",
	},

	info: {
		paddingLeft: 40,
		paddingRight: 40,
		textAlign: "center",
		lineHeight: 24,
		color: "rgba(0,0,0,0.3)",
	},
});
