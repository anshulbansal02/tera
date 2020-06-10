import React, { Component } from "react";
import { Animated, View, StyleSheet, Image, Dimensions, Easing } from "react-native";

const RIPPLE_COUNT = 5;
const WAVES_SIZE = Dimensions.get("window").width;

export default class Waves extends Component {
	constructor(props) {
		super(props);

		this.anim_configs = new Array(RIPPLE_COUNT);
		this.icon_scale = new Animated.Value(1);

		for (let i = 0; i < RIPPLE_COUNT; i++) {
			this.anim_configs[i] = {
				scale: new Animated.Value(0),
				opacity: new Animated.Value(0),
			};
		}
		


		this.rippleAnimation = Animated.loop(
			Animated.stagger(300, [
				...this.anim_configs.map(({ scale, opacity }) => {
					return Animated.parallel([
						Animated.sequence([
							Animated.timing(opacity, {
								toValue: 1,
								duration: 400,
							}),
							Animated.timing(opacity, {
								toValue: 0,
								duration: 800,
							}),
						]),
						Animated.sequence([
							Animated.timing(scale, {
								toValue: 1,
								duration: 1200,
							}),
						]),
					]);
				}),
			]),
			{ useNativeDriver: true }
		)


		this.iconScaleUp = Animated.timing(
			this.icon_scale,
			{
				toValue: 1,
				duration: 500,
				easing: Easing.elastic()
			}
		)

		this.iconScaleDown = Animated.timing(
			this.icon_scale,
			{
				toValue: 0.25,
				duration: 500,
				easing: Easing.elastic()
			}
		)

	}




	componentDidMount() {
		
	}


	componentDidUpdate(prevProp, prevState) {
		if (this.props.active == true) {
			this.activateWave();
		}
		else {
			this.deactivateWave();
		}
	} 



	activateWave = () => {
		this.iconScaleDown.start();
		this.rippleAnimation.start();

	}


	deactivateWave = () => {
		this.anim_configs.forEach((config) => {
			config.scale.setValue(0);
			config.opacity.setValue(0);
		});
		this.iconScaleUp.start();
	}





	// renderDevices = () => {
	// 	if (this.props.devices) {
	// 		this.props.devices.map
	// 		return (
	// 			<TouchableWithoutFeedback>
	// 			<Animated.View style={style.deviceAvatar}>
	// 				<Image source={require('../../assets/avatar5.png')} style={style.avatarIcon}/>
	// 			</Animated.View>
	// 			</TouchableWithoutFeedback>
	// 		);
	// 	}
	// }

	 

	render() {
		return (
			<View style={style.waves}>

				{this.anim_configs.map(({ scale, opacity }, index) => {
					return (
						<Animated.View
							key={index}
							style={[
								style.circle,
								{ opacity, transform: [{ scale }] },
							]}
						/>
					);
				})}

				<Animated.View style={[style.circleStatic, {elevation: this.icon_scale.interpolate({
					inputRange: [0.25, 0.6],
					outputRange: [5, 0]
				}) ,transform: [{scale: this.icon_scale}]}]}>
					<Image
						style={style.circleIcon}
						source={require("../../assets/devices.png")}
					/>
				</Animated.View>


				

			</View>
		);
	}
}

const style = StyleSheet.create({
	waves: {
		justifyContent: "center",
		alignItems: "center",
		width: WAVES_SIZE,
		height: WAVES_SIZE,
	},
	circle: {
		width: "100%",
		height: "100%",
		position: "absolute",
		backgroundColor: "rgba(54, 121, 245, 0.1)",
		borderRadius: WAVES_SIZE/2,
	},
	circleStatic: {
		width: 200,
		height: 200,
		position: "absolute",
		backgroundColor: "#fff",
		borderRadius: 300,
		justifyContent: "center",
		alignItems: "center",

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
	},
	circleIcon: {
		width: "60%",
		height: "60%",
		opacity: 0.2,
	},

	deviceAvatar: {
		position: "absolute",
		right: 50,
		top: 100,
		width: 65,
		height: 65,
		overflow: "hidden",
		borderRadius: 40,
		backgroundColor: "#E7DFF7",
		justifyContent: "flex-end",
		alignItems: "center",
		elevation: 10
	},

	avatarIcon: {
		width: "80%",
		height: "80%"
	}


});
