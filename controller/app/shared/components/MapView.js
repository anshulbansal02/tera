import React, { Component } from 'react';
import { Image, Text, View, StyleSheet} from 'react-native';


export default class MapView extends Component {
    render() {
        return (
            <View style={[style.mapView, this.props.style]}>
                <Image style={style.icon} source={require("../../assets/map.png")} />
                <Text>Localization Map Unavailable</Text>
            </View>
        );
    }
}

const style = StyleSheet.create({
    mapView: {
        width: 260,
        height: 140,
        elevation: 5,
        backgroundColor: "#fff",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },

    icon : {
        width: 25,
        height: 25,
        marginBottom: 10
    }


});