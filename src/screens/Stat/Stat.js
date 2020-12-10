import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, TextInput, ScrollView,Picker, RefreshControl} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-paper';
import Axios from "axios";

let ip ='192.168.1.12' ;

const Stat = () => {
    const [NMR,setNMR] = useState(0);
    const [duree,setDuree] = useState(0);
    const [diplome,setDiplome] = useState("2020");
    const [poste,setPoste] = useState("2020");
    const [company,setCompany] = useState("2020");
    const [companySkills,setCompanySkills] = useState("2020");
    const [yourSkills,setYourSkills] = useState("2020");
    const [loading , setLoading] = useState(false);
    const [token ,setToken] = useState(null) ;
    const getData = async ()=> {
        await AsyncStorage.getItem('token').then(res => {
            setToken(res);
        } );
    }
    useEffect(()=> {
        getData();
    },[]);
    const pushData=()=>{
        let data ={
            "NMR" : NMR , 
            "year_recruitment":diplome,
            "duree":duree,
            "poste" :poste,
            "company" : company,
            "companySkills" :companySkills,
            "yourSkills": yourSkills
        }
        console.log('data ==> ' , data);
        setLoading(true);
        // Axios.post(`http://${ip}:8001/api/stat`,data,{
        //     headers:{
        //         "Content-Type" : "application/json",
        //         Authorization: `Bearer ${token}`
        //     }
        // }).then(response=> {
        //     alert("ajouté avec succès");
        //     setLoading(false);
        // }).catch(error => {
        //     setLoading(false)
        //     alert(error)});
    };
    return (<ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Text style={{fontSize : 23, fontWeight : '600',marginVertical: 10 , top : 5}}> La premiere Embauche </Text>
        <Text style={styles.text}> Nombre de mois de recherche </Text>
        <TextInput placeholder={'Nombre de mois'} style={styles.input} keyboardType={'numeric'} selectionColor={'red'}
                   onChangeText={(nbr)=> setNMR(nbr)}
        />
        <View style={{flex:1, flexDirection:'row',alignItems : 'center'}}>
            <Text style={styles.text}> Année de recrutement </Text>
            <Picker
                selectedValue={diplome}
                style={{left:50,height: 50, width: 100}}
                onValueChange={(itemValue, itemIndex) => {
                    console.log('selected value ' ,itemValue)
                    setDiplome(itemValue)}}
            >
                <Picker.Item label="2014" value="2014" />
                <Picker.Item label="2015" value="2015" />
                <Picker.Item label="2016" value="2016" />
                <Picker.Item label="2017" value="2017" />
                <Picker.Item label="2018" value="2018" />
                <Picker.Item label="2019" value="2019" />

            </Picker>
        </View>

        <Text style={styles.text}> Durée par mois </Text>
        <TextInput placeholder={'Nombre de mois'} style={styles.input} keyboardType={'numeric'} selectionColor={'red'}
                   onChange={(nbr)=> setDuree(nbr)}
        />
        <Text style={styles.text}> Poste </Text>
        <TextInput placeholder={'Poste'} style={styles.input} selectionColor={'red'}
                   onChange={(text)=> setPoste(text)}
        />
        <Text style={styles.text}> Entreprise </Text>
        <TextInput placeholder={'Entreprise'} style={styles.input} selectionColor={'red'}
                   onChange={(text)=> setCompany(text)}
        />
        <Text style={styles.text}> Compétences qui vous ont étés utiles à l'embauche </Text>
        <Picker
            selectedValue={diplome}
            style={{height: 50, width: '100%' }}
            onValueChange={(itemValue, itemIndex) => setCompanySkills(itemValue)}
        >
            <Picker.Item label="Réseaux radio-mobile" value="0"  color=""/>
            <Picker.Item label="Réseau VPN" value="1" />
            <Picker.Item label="Certification CISCO" value="2" />
            <Picker.Item label="Platforme de services dans les réseaux" value="3" />
        </Picker>
        <Text style={styles.text}> Compétences acquises </Text>
        <Picker
            selectedValue={diplome}
            style={{height: 50, width: '100%'}}
            onValueChange={(itemValue, itemIndex) => setYourSkills(itemValue)}
        >
            <Picker.Item label="Réseaux radio-mobile" value="0"  color=""/>
            <Picker.Item label="Sécurité" value="1" />
            <Picker.Item label="IOT" value="2" />
            <Picker.Item label="Administration d'entreprises Réseaux " value="3" />
        </Picker>
        <Button
            title="Left button"
            onPress={pushData}
            mode="contained"
            color='#50aeff'
            loading={loading}
            style={styles.button}
            labelStyle={styles.label}
            contentStyle={{height:60}}
        > Envoyer </Button>
    </ScrollView>);
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20

    },
    input: {
        height: 50,
        width: '100%',
        borderWidth: 1,
        padding: 15,
        borderColor: '#bebcbc',
        marginBottom: 5,
        borderRadius: 50,
    },
    text: {
        marginVertical: 10,
        marginLeft: 8,
        color: '#606060',
    },
    button: {
        borderRadius: 50,
        height: 60,
        marginBottom: 20,
        marginVertical: 5
    },
    label : {
        color: 'white'
    },
    textBottom : {
        flex: 1,
        justifyContent: 'center'
    }
});
export default Stat;