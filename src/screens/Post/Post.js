import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, TextInput, ScrollView,CheckBox,Picker, RefreshControl} from "react-native";
import {Button} from 'react-native-paper';
import axios from "axios";


const Post = () => {
    const [nom,setNom] = useState("");
    const [diplome,setDiplome] = useState("2020");
    const [isSelected,setSelection] = useState(false);

    const [loading , setLoading] = useState(false);



    const ifEvent = () => {
        return (
            <>
            <Text style={styles.text}> Nom de l'Evènement </Text>
            <TextInput placeholder={'Durée par mois'} style={{height: 50,
                width: '100%',
                borderWidth: 1,
                padding: 15,
                borderColor: '#bebcbc',
                marginBottom: 5,
                borderRadius: 50,}} selectionColor={'red'}
                       onChange={(text)=> setNom(text)}
            />
             <Text style={styles.text}> Date de l'Evènement </Text>
                <TextInput placeholder={'Date de l\'Evènement'} style={{height: 50,
                    width: '100%',
                    borderWidth: 1,
                    padding: 15,
                    borderColor: '#bebcbc',
                    marginBottom: 5,
                    borderRadius: 50,}} selectionColor={'red'}
                           onChange={(text)=> setNom(text)}
                />
            </>
        )
    }


    return (<ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Text style={{fontSize : 23, fontWeight : '600',marginVertical: 10 , top : 5}}> Ajouter un statut </Text>
        <View style={styles.inputContainer} >
            <TextInput placeholder={'Ecrire votre status ici'}
                       placeholderTextColor="grey"
                       numberOfLines={10}
                       onChange={(text)=> setNom(text)}
            />
        </View>

        <Button title="Ajouter un fichier" />

        <View style={{flex:1, flexDirection:'row',alignItems : 'center',justifyContent: 'space-between',}}>
            <Text style={styles.text}> Evènement </Text>
            <CheckBox
                value={isSelected}
                onValueChange={setSelection}
                tintColors={{ true: '#2472e2' }}
            />
        </View>

        {
            isSelected ? ifEvent() :  null
        }

        <Button
            title="Left button"
            onPress={() => 0}
            mode="contained"
            color='#50aeff'
            loading={loading}
            style={styles.button}
            labelStyle={styles.label}
            contentStyle={{height:60}}

        > Ajouter </Button>

    </ScrollView>);
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20

    },
    inputContainer  : {
        height: 200,
        width: '100%',
        borderWidth: 1,
        padding: 15,
        borderColor: '#bebcbc',
        marginVertical: 10,
        borderRadius: 10,
        alignItems:'flex-start',

    },
    input: {
        height:400,
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
        marginVertical: 30
    },
    label : {
        color: 'white'
    },
    textBottom : {
        flex: 1,
        justifyContent: 'center'
    }
});
export default Post;
