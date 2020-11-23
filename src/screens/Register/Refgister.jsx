import React, {useState} from "react";
import {View, Text, StyleSheet, TextInput, ScrollView, RefreshControl} from "react-native";
import {Button} from 'react-native-paper';


const Register = () => {
    const [loading , setLoading] = useState(false)
    return (<ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Text style={styles.text}>Nom</Text>
        <TextInput placeholder={'Nom ... '} style={styles.input} selectionColor={'red'}/>
        <Text style={styles.text}> Prenom</Text>
        <TextInput placeholder={'Prénom ... '} style={styles.input}/>
        <Text style={styles.text}> Email </Text>
        <TextInput placeholder={'Email ... '} keyboardType={'email-address'} style={styles.input}/>
        <Text style={styles.text}> Classe </Text>
        <TextInput placeholder={'Classe ... '} style={styles.input}/>
        <Text style={styles.text}> Telephone </Text>
        <TextInput placeholder={'Telephone ... '} keyboardType={'phone-pad'} style={styles.input}/>
        <Text style={styles.text}> Mot de passe </Text>
        <TextInput placeholder={'Mot de passe ... '} secureTextEntry={true} style={styles.input} />
        <Text style={styles.text}> Confirmer Mot de passe </Text>
        <TextInput placeholder={'Confirmer Mot de passe ... '} secureTextEntry={true} style={styles.input}/>
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
    </ScrollView>);
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 30,
    },
    input: {
        height: 50,
        width: '100%',
        borderWidth: 1,
        padding: 15,
        borderColor: '#bebcbc',
        marginBottom: 20,
        borderRadius: 50,
    },
    text: {
        marginVertical: 5,
        marginLeft: 8,
        color: '#606060',
    },
    button: {
        borderRadius: 50,
        height: 60,
        marginBottom: 100
    },
    label : {
        color: 'white'
    }
});
export default Register;
