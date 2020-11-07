import React from "react";
import {Button, TextInput, View, StyleSheet} from "react-native";


const LoginScreen = (props) => {
    return (
        <View style={styles.container}>
            <TextInput style={styles.input} value={props.name} placeholder="Enter your name" onChangeText={props.onChangeText}/>
            <Button onPress={props.onPress} title="Enter the Chat"/>
        </View>
    )
}

const styles = StyleSheet.create({
    input : {
        height : 50,
        width : '100%',
        borderWidth : 1,
        padding : 15,
        borderColor : 'grey',
        marginBottom : 20
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding : 30,
    }
})


export default LoginScreen ;
