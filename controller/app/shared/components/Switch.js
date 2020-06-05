import React, { Component } from "react";
import {
	View,
	StyleSheet,
	Animated,
	TouchableWithoutFeedback,
	Easing,
} from "react-native";

export default class Switch extends Component {
	constructor(props) {
		super(props);

		this.anim_pos = new Animated.Value(5);
		this.anim_color = new Animated.Value(0);

		this.state = {
			value: false,
		};
	}

	// Animated properties: thumb = postion, color; track: backgroundColor

	toggle = () => {
		if (this.state.value) {
			Animated.timing(this.anim_pos, {
				toValue: 5,
				duration: 200,
				easing: Easing.inOut(Easing.quad),
            }).start();
            Animated.timing(this.anim_color, {
                toValue: 0,
				duration: 200,
				easing: Easing.inOut(Easing.quad),
            }).start();
		} else {
			Animated.timing(this.anim_pos, {
				toValue: 30,
				duration: 200,
				easing: Easing.inOut(Easing.quad),
            }).start();
            Animated.timing(this.anim_color, {
                toValue: 1,
				duration: 200,
				easing: Easing.inOut(Easing.quad),
            }).start();
		}

		this.props.onChange(!this.state.value);
		this.setState({ value: !this.state.value });
	};

	render() {
		const trackBGColor = this.anim_color.interpolate({
			inputRange: [0, 1],
			outputRange: ["rgba(0,0,0,0.15)", "rgba(0, 133, 254, 1)"],
		});

		return (
			<TouchableWithoutFeedback
				style={this.props.style}
				onPress={this.toggle}
				accessibilityRole="switch"
			>
				<Animated.View style={[style.track, {backgroundColor: trackBGColor}]}>
					<Animated.View
						style={[style.thumb, { left: this.anim_pos }]}
					></Animated.View>

				</Animated.View>
			</TouchableWithoutFeedback>
		);
	}
}

const style = StyleSheet.create({
	thumb: {
		width: 25,
		height: 25,
		backgroundColor: "#fff",
		borderRadius: 100,
		elevation: 5,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
	},

	track: {
		width: 60,
		height: 35,
		backgroundColor: "rgba(0,0,0,0.15)",
		borderRadius: 100,
		justifyContent: "center",
	},
});
