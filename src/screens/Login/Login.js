import React , {useState} from "react";
import {TextInput, View, StyleSheet,Text} from "react-native";
import {Button} from 'react-native-paper';



const LoginScreen = (props) => {
    const [loading , setLoading] = useState(false)


    return (
        <View style={styles.container}>
            <Text  style={styles.text}> Email </Text>
            <TextInput style={styles.input} value={props.name} placeholder="Entrer votre Email ..." onChangeText={props.onChangeText}/>
            <Text style={styles.text}> Mot de passe  </Text>
            <TextInput style={styles.input} value={props.name} placeholder="Tapez votre mot de passe ... " onChangeText={props.onChangeText}/>
            <Button
            title="Left button"
            onPress={() => 0}
            mode="contained"
            color='#50aeff'
            loading={loading}
            style={styles.button}
            labelStyle={styles.label}
            contentStyle={{height:60}}
        > S'inscrire </Button>
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
        marginBottom : 20,
        borderRadius : 50 
    },
    text : {
        marginBottom : 6 ,
        alignSelf : 'flex-start',
        color : 'gray',
        marginLeft : 10
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding : 30,
    },
    button: {
        borderRadius: 50,
        height: 60,
        marginBottom: 20,
        width: '100%'
    },
    label : {
        color: 'white'
    },
    textBottom : {
        flex: 1,
        justifyContent: 'center'
    }
})


export default LoginScreen ;
