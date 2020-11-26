import React, { useState, useContext } from "react";
import { TextInput, View, StyleSheet, Text } from "react-native";
import { Button } from 'react-native-paper';
import { log } from "react-native-reanimated";
import AuthContext from '../../components/Context/AuthContext';

const LoginScreen = ({navigation}) => {
    const [loading, setLoading] = useState(false)
    const { signIn } = useContext(AuthContext);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    return (
        <View style={styles.container}>
            <Text style={styles.text}> Email </Text>
            <TextInput style={styles.input}
                value={username}
                placeholder="Entrer votre Email ..."
                keyboardType={'email-address'}
                onChangeText={text => setUsername(text)} />
            <Text style={styles.text}> Mot de passe  </Text>
            <TextInput style={styles.input}
                value={password}
                secureTextEntry
                placeholder="Tapez votre mot de passe ... "
                onChangeText={text => setPassword(text)} />
            <Button
                onPress={() => {
                    setLoading(true);
                    if (password == null || username == null || password == "" || username == "") {
                        setLoading(false);
                        alert("Il y a un champ vide !!! ");
                    } else {
                        signIn(username, password, setLoading);
                    }

                }}
                mode="contained"
                color='#50aeff'
                loading={loading}
                style={styles.button}
                labelStyle={styles.label}
                contentStyle={{ height: 60 }}
            > Se connecter </Button>
            <Text style={{ color: 'gray' }} > Vous n'avez pas un compte ? <Text style={{ color: '#6495ED' }}
                                                                                onPress={()=> {
                                                                                    console.log("oressed ! ");
                                                                                    navigation.navigate('Inscription')
                                                                                }}
                                                                        >
                S'inscrire
            </Text>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 50,
        width: '100%',
        borderWidth: 1,
        padding: 15,
        borderColor: 'grey',
        marginBottom: 20,
        borderRadius: 50
    },
    text: {
        marginBottom: 6,
        alignSelf: 'flex-start',
        color: 'gray',
        marginLeft: 10
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    button: {
        borderRadius: 50,
        height: 60,
        marginBottom: 20,
        width: '100%'
    },
    label: {
        color: 'white'
    },
    textBottom: {
        flex: 1,
        justifyContent: 'center'
    }
})


export default LoginScreen;
