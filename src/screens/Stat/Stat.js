import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, TextInput, ScrollView,Picker, RefreshControl} from "react-native";
import {Button} from 'react-native-paper';
import axios from "axios";


const Stat = () => {
    const [nom,setNom] = useState("");
    const [diplome,setDiplome] = useState("2020");

    const [loading , setLoading] = useState(false)
    return (<ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Text style={{fontSize : 23, fontWeight : '600',marginVertical: 10 , top : 5}}> La premiere Embauche </Text>
        <Text style={styles.text}> Nombre de mois de recherche </Text>
        <TextInput placeholder={'Nombre de mois'} style={styles.input} selectionColor={'red'}
                   onChange={(text)=> setNom(text)}
        />
        <View style={{flex:1, flexDirection:'row',alignItems : 'center'}}>
            <Text style={styles.text}> Année de recrutement </Text>
            <Picker
                selectedValue={diplome}
                style={{left:50,height: 50, width: 100}}
                onValueChange={(itemValue, itemIndex) => setDiplome(itemValue)}
            >
                <Picker.Item label="2014" value="0" />
                <Picker.Item label="2015" value="1" />
                <Picker.Item label="2016" value="2" />
                <Picker.Item label="2017" value="3" />
                <Picker.Item label="2018" value="4" />
                <Picker.Item label="2019" value="5" />

            </Picker>
        </View>

        <Text style={styles.text}> Durée par mois </Text>
        <TextInput placeholder={'Nombre de mois'} style={styles.input} selectionColor={'red'}
                   onChange={(text)=> setNom(text)}
        />


        <Text style={styles.text}> Poste </Text>
        <TextInput placeholder={'Poste'} style={styles.input} selectionColor={'red'}
                   onChange={(text)=> setNom(text)}
        />

        <Text style={styles.text}> Entreprise </Text>
        <TextInput placeholder={'Entreprise'} style={styles.input} selectionColor={'red'}
                   onChange={(text)=> setNom(text)}
        />

        <Text style={styles.text}> Compétences qui vous ont étés utiles à l'embauche </Text>
        <Picker
            selectedValue={diplome}
            style={{height: 50, width: '100%' }}
            onValueChange={(itemValue, itemIndex) => setDiplome(itemValue)}
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
            onValueChange={(itemValue, itemIndex) => setDiplome(itemValue)}
        >
            <Picker.Item label="Réseaux radio-mobile" value="0"  color=""/>
            <Picker.Item label="Sécurité" value="1" />
            <Picker.Item label="IOT" value="2" />
            <Picker.Item label="Administration d'entreprises Réseaux " value="3" />


        </Picker>


        <Button
            title="Left button"
            onPress={() => 0}
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