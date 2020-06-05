import React, { Component } from "react";
import { View, StyleSheet, Easing, Text, Animated } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";

export default class Joystick extends Component {
	constructor(props) {
		super(props);

		this.anim_x = new Animated.Value(0);
		this.anim_y = new Animated.Value(0);

		this.maxOffset = 70;

		this.state = {
			xTransform: 0,
			yTransform: 0,
		};
	}

	componentDidUpdate(prevProps, prevState) {
		const prevXY = prevState;
		const currXY = this.state;

		// Move to utils, Remember to iterpolate values between 0-100
		Object.keys(prevXY).map(function (key, index) {
			prevXY[key] = Math.round(prevXY[key]);
		});

		Object.keys(currXY).map(function (key, index) {
			currXY[key] = Math.round(currXY[key]);
		});

		if (
			!(JSON.stringify(prevXY) === JSON.stringify(currXY)) &&
			this.props.onValue
		)
			this.props.onValue(currXY);
	}

	centerAnimatedPostion = () => {
		Animated.timing(this.anim_x, {
			toValue: this.state.xTransform,
			duration: 200,
			easing: Easing.elastic(),
		}).start();
		Animated.timing(this.anim_y, {
			toValue: this.state.yTransform,
			duration: 200,
			easing: Easing.elastic(),
		}).start();
	};

	setAnimatedPosition = () => {
		Animated.timing(this.anim_x, {
			toValue: this.state.xTransform,
			duration: 0,
		}).start();
		Animated.timing(this.anim_y, {
			toValue: this.state.yTransform,
			duration: 0,
		}).start();
	};

	handleDrag = (event) => {
		const xOffset = event.nativeEvent.translationX;
		const yOffset = event.nativeEvent.translationY;

		const angle = Math.atan2(yOffset, xOffset);
		const distance = Math.min(this.maxOffset, Math.hypot(xOffset, yOffset));

		const xTransform = distance * Math.cos(angle);
		const yTransform = distance * Math.sin(angle);

		this.setState(
			{
				xTransform,
				yTransform,
			},
			this.setAnimatedPosition
		);
	};

	handleLeave = (event) => {
		if ((event.nativeEvent.state = State.END)) {
			this.setState(
				{ xTransform: 0, yTransform: 0 },
				this.centerAnimatedPostion
			);
		}
	};

	render() {
		return (
			<View style={[style.joystick, this.props.style]}>
				<View style={style.base}>
					<PanGestureHandler
						onGestureEvent={this.handleDrag}
						onHandlerStateChange={this.handleLeave}
					>
						<Animated.View
							style={[
								style.stick,
								{
									transform: [
										{
											translateX: this.anim_x,
										},
										{
											translateY: this.anim_y,
										},
									],
								},
							]}
						></Animated.View>
					</PanGestureHandler>
				</View>
			</View>
		);
	}
}

const style = StyleSheet.create({
	joystick: {
		width: 130,
		height: 130,
		alignItems: "center",
		justifyContent: "center",
	},

	base: {
		width: "100%",
		height: "100%",
		backgroundColor: "#202020",
		borderRadius: 10000,
		justifyContent: "center",
		alignItems: "center",
	},

	stick: {
		width: "40%",
		height: "40%",
		borderRadius: 100,
		backgroundColor: "rgba(219,35,35,1)",
	},
});
