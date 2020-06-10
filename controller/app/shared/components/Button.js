import React, { Component } from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';


export default class Button extends Component {
    render() {
        return(
            <TouchableOpacity
            onPress={this.props.onPress}
            style={[style.btn, this.props.style]}>
                <Text style={[style.text, this.props.textStyle]}>{this.props.title}</Text>
            </TouchableOpacity>
        )
    }
}

const style = StyleSheet.create({
    btn: {
        backgroundColor: "#3679F5",
        height: 55,
        width: 300,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        elevation: 4,
        margin: 10
    },
    text: {
        color: "rgba(255,255,255,0.85)",
        fontSize: 16,
        fontWeight: "bold"
    }


});