import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, TextInput, ScrollView, Alert} from "react-native";
import {Button} from 'react-native-paper';
import axios from "axios";
import ImageUpload from "../../components/ImagePicker/ImageUpload";


let ip = '192.168.1.36';
const updateProfile = ({navigation}) => {
    const [nom,setNom] = useState("");
    const [prenom,setPrenom] = useState("");
    const [email,setEmail] = useState("");
    const [classe,setClasse] = useState("");
    const [tel,setTel] = useState();
    const [password,setPassword] = useState("");
    const [loading , setLoading] = useState(false)

    useEffect(() => {
        console.log('iskander',navigation);
        // console.log(email);
        // console.log(prenom);
        // console.log(nom);
        // console.log(classe);
        // console.log(tel);
    })

    function updateParam() {
        // alert(`Donayla test  ${email}`);
        setLoading(true);
        axios.post(`http://${ip}:8001/api/addUser`,{
            "email": email,
            "password" :password,
            "nom" : nom,
            "prenom" : prenom,
            "telephone": parseInt(tel),
            "classe" : classe
        },{
            headers:{
                "Content-Type" : "application/json"
            }
        }).then(function (response) {
            // handle success
            setTimeout(()=> navigation.navigate('Se connecter'),500)
            setTimeout(()=>{
                Alert.alert("utilisateur ajouté avec succès ♥",`${email}`);
                setLoading(false)},200);
        }).catch(error => {
            setLoading(false);
            console.log('====================================');
            console.log( error.response);
            console.log('====================================');
            alert(`${error.response.data.message.detail}`);
        })
    }

    return (<ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Text style={styles.text}>Nom</Text>
        <TextInput value={nom} style={styles.input} selectionColor={'red'}
                   onChangeText={(text)=> setNom(text)}
        />
        <Text style={styles.text}> Prenom</Text>
        <TextInput value={prenom} style={styles.input}
                   onChangeText={(text)=> setPrenom(text)}
        />
        <Text style={styles.text}> Email </Text>
        <TextInput
            value={email}
            keyboardType={'email-address'}
            style={styles.input}
            onChangeText={ text=> setEmail(text)}
        />
        <Text style={styles.text}> Classe </Text>
        <TextInput value={classe} style={styles.input}
                   onChangeText={(text)=> setClasse(text)}
        />
        <Text style={styles.text}> Telephone </Text>
        <TextInput value={email} keyboardType={'phone-pad'} style={styles.input}
                   onChangeText={(text)=> setTel(text)}
        />
        <Text style={styles.text}> Mot de passe actuel </Text>
        <TextInput placeholder={'Mot de passe actuel '} secureTextEntry={true} style={styles.input}
                   onChangeText={(text)=> setPassword(text)}
        />
        <Text style={styles.text}> Nouveau Mot de passe </Text>
        <TextInput placeholder={'Nouveau Mot de passe'} secureTextEntry={true} style={styles.input}
                   onChangeText={(text)=> setPassword(text)}
        />
        <Text style={styles.text}> Confirmer Mot de passe </Text>
        <TextInput placeholder={'Confirmer Mot de passe'} secureTextEntry={true} style={styles.input}/>

        <Button
            title="Left button"
            onPress={() => updateParam()}
            mode="contained"
            color='#50aeff'
            loading={loading}
            style={styles.button}
            labelStyle={styles.label}
            contentStyle={{height:60}}
            onPress={updateParam}
        > Enregistrer </Button>

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
        marginBottom: 20
    },
    label : {
        color: 'white'
    },
    textBottom : {
        flex: 1,
        justifyContent: 'center'
    }
});
export default updateProfile;
