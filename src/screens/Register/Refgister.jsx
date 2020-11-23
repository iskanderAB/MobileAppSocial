import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, TextInput, ScrollView, RefreshControl} from "react-native";
import {Button} from 'react-native-paper';
import axios from "axios";


const Register = ({navigation}) => {
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

      function requestRegistre() {
        // alert(`Donayla test  ${email}`);
        setLoading(true);
         axios.post("http://192.168.0.53:8001/api/addUser",{
            "email": email,
            "password" :password,
            "nom" : nom,
            "prenom" : prenom,
            "telephone": parseInt(tel),
            "classe" : classe
        },{
            headers:{
            //    Authorization : "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2MDYxNDU0OTEsImV4cCI6MTYwNjE0OTA5MSwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoidXNlcjBAZ21haWwuY29tIn0.T6IJcnlZvf7_UeqaoUmdrat--jxsGB9B-QM63TIe_WjJOcUvRnm75nVjALJv18u0RJua7yy1no2SShbY0yDCivbnrR4Rmd1yqJ8loxxzb9FhOc0yaIaPvpISExDgGZ4udzafWAU9Hi48meTzC1w_TxRPyWGQOGM--v0sy1J-4CMtAUted48Qmd2V9cs_2wVODCr9_6l3yvxha_DAlXZMhNtK7T3MpMWbcRWd0SrLiCTwq6sWJo6KiNC-o_-NOqz4LmQIz-ESPZWvSeHq5spmIojeFXG9ZiE7W5b8NgnQfeRJiy7vXK2HBXSRT-5nnVVqCjXr_enklR4jMqvJ2rCfpsesbJJ_KaoYAO5tdSdEzDnreqNcyLW24TUUEFGGiTiu4zG8y3JK8BT1wHQadqBtnr_WKHk4VCxTcWtRwou6vXJwRUogThoW9l1b1CjxMMa3mLA_hf4MiRY5z23mMpB16Vx16n3Tpl0RCxJe-qkFglML9YNUjyxDLvU89-8570nrpWFPQcah84IrS2uRgjphjMIgpjd4IQii9aVU1-qy-izyNNi8VaVmDaRW5lJK5Zrajodvlsc9w7TkrjYg0upfs9k_luJLvwoOh8jgYZLvHE3H3KmIc5P-NWcxHNocqpTzKdErr41jZXADYo2Jz8NxEOjDv14YctIynkDfotRrqPc",
                "Content-Type" : "application/json"
            }
        }).then(function (response) {
            // handle success
            setTimeout(()=> navigation.navigate('App'),500)
            setTimeout(()=>{
                 alert(`user added ! ${email}`);
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
        <TextInput placeholder={'Nom ... '} style={styles.input} selectionColor={'red'}
        onChangeText={(text)=> setNom(text)}
        />
        <Text style={styles.text}> Prenom</Text>
        <TextInput placeholder={'Prénom ... '} style={styles.input}
        onChangeText={(text)=> setPrenom(text)}
        />
        <Text style={styles.text}> Email </Text>
        <TextInput 
            placeholder={'Email ... '} 
            keyboardType={'email-address'} 
            style={styles.input}
            onChangeText={ text=> setEmail(text)}
        />
        <Text style={styles.text}> Classe </Text>
        <TextInput placeholder={'Classe ... '} style={styles.input}
        onChangeText={(text)=> setClasse(text)}
        />
        <Text style={styles.text}> Telephone </Text>
        <TextInput placeholder={'Telephone ... '} keyboardType={'phone-pad'} style={styles.input}
        onChangeText={(text)=> setTel(text)}
        />
        <Text style={styles.text}> Mot de passe </Text>
        <TextInput placeholder={'Mot de passe ... '} secureTextEntry={true} style={styles.input}
        onChangeText={(text)=> setPassword(text)}
        />
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
            onPress={requestRegistre}
        > S'inscrire </Button>
        <View style={{flex:1, alignItems: 'center',marginBottom: 20}}>
        <Text style={styles.textBottom}> Vous avez un compte ? </Text>
        <Text style={{color:'#00A8FF'}}> Se connecter </Text>
        </View>
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
export default Register;
