import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";

import Animated, {
	block,
	set,
	cond,
	eq,
	call,
	add,
	sqrt,
	multiply,
	pow,
	Value,
	event,
	min,
	cos,
	sin,
	Clock
} from "react-native-reanimated";
import { atan2 } from "react-native-redash";




export default class Joy extends Component {
	constructor(props) {
		super(props);

		this.distance = new Value(0);
		this.angle = new Value(0);
		this.touchState = new Value(-1);
		this.transX = new Value(0);
		this.transY = new Value(0);

		this.maxOffset = 70;

		this.handleDrag = event([
			{
				nativeEvent: ({ translationX, translationY, state }) =>
					block([
						set(this.touchState, state),
						set(
							this.distance,
							min(
								this.maxOffset,
								sqrt(
									add(
										pow(translationX, 2),
										pow(translationY, 2)
									)
								)
							)
						),
						set(
							this.angle,
							min(
								this.maxOffset,
								atan2(translationY, translationX)
							)
						),
						set(
							this.transX,
							multiply(this.distance, cos(this.angle))
						),
						set(
							this.transY,
							multiply(this.distance, sin(this.angle))
						),
						call([this.transX, this.transY], this.onValue),
					]),
			},
		]);

		this.anim_x = cond(eq(this.touchState, State.ACTIVE), this.transX);

		this.anim_y = cond(eq(this.touchState, State.ACTIVE), this.transY);
	}



	onValue = ([x, y]) => {
		// console.log(x,y)
		this.props.onValue ? this.props.onValue(x,y) : null;
	};

	render() {
		return (
			<View style={[style.joystick, this.props.style]}>
				<View style={style.base}>
					<PanGestureHandler
						onGestureEvent={this.handleDrag}
						onHandlerStateChange={this.handleDrag}
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
