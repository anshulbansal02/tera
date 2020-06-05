import React from 'react';
import { View, TouchableWithoutFeedback, Image, StyleSheet } from 'react-native';

const IconButton = ({icon}) => {
    return (
        <TouchableWithoutFeedback>
        <View style={style.btn}>
            <Image style={style.icon} source={icon} />
        </View>
        </TouchableWithoutFeedback>
    );
}

const style = StyleSheet.create({
    btn: {
        width: 35,
        height: 35,
        backgroundColor: "gold",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center"
    },

    icon: {
        width: "60%",
        height: "60%"
    }
});

export default IconButton;