import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    CheckBox,
    TouchableOpacity,
    Picker,
    RefreshControl,
    Pressable,
    Alert
} from "react-native";
import {Button} from 'react-native-paper';
import axios from "axios";
import {MaterialIcons} from "@expo/vector-icons";

import DateTimePicker from '@react-native-community/datetimepicker';

import ImageUpload from "../../components/ImagePicker/ImageUpload";

import { Fontisto } from '@expo/vector-icons';


const Post = () => {
    const [isSelected,setSelection] = useState(false);
    const [loading , setLoading] = useState(false);
    const [status, setStatus] = useState();
    const [nomEven, setNomEven] = useState();
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    let ip = '192.168.1.36';


    function requestPost() {
        // alert(`Donayla test  ${email}`);
        setLoading(true);
        axios.post(`http://${ip}:8001/api/addPost`,{
            "content": status,
            "type" :status,

        },{
            headers:{
                "Content-Type" : "application/json"
            }
        }).then(function (response) {
            // handle success
            setTimeout(()=> navigation.navigate("Home"),500)
            setTimeout(()=>{
                Alert.alert("utilisateur ajouté avec succès ♥");
                setLoading(false)},200);
        }).catch(error => {
            setLoading(false);
            console.log('====================================');
            console.log(error.response);
            console.log('====================================');
            alert(`${error.response.data.message.detail}`);
        })
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'Android');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const ifEvent = () => {
        return (
            <View style={{flex:1 }}>
            <Text style={styles.text}> Nom de l'Evènement </Text>
            <TextInput placeholder={'Nom de l\'Evènement'} style={{height: 50,
                width: '100%',
                borderWidth: 1,
                padding: 15,
                borderColor: '#bebcbc',
                marginBottom: 5,
                borderRadius: 50,}} selectionColor={'red'}
                       onChangeText={(text)=> setNomEven(text)}
            />

             <Text style={styles.text}> Date de l'Evènement </Text>

                    <View>
                        <TouchableOpacity style={styles.dateBut} onPress={showDatepicker}>
                            <Text style={{fontWeight:"700",color: '#606060'}}>{date.getMonth()}/{date.getDate()}/{date.getFullYear()}</Text>
                            <Fontisto name="date" size={24} color="black" />
                        </TouchableOpacity>
                        <Text style={styles.text}> </Text>
                    </View>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />
                    )}
            </View>
        )
    }


    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.header}>
            <Text style={{
                fontWeight: 'bold',
                fontSize: 20,
            }}> Ajouter status </Text>
        </View>

        <View style={styles.container1}>
            <View style={styles.inputContainer} >
                <TextInput
                       style={{textAlignVertical: 'top'}}
                       placeholder={'Ecrire votre status ici'}
                       placeholderTextColor="grey"
                       numberOfLines={10}
                       multiline={true}
                       onChangeText={(text)=> setStatus(text)}
                />
        </View>

        <ImageUpload/>

        <View style={{ flexDirection:'row',justifyContent: 'space-between'}}>
            <Text style={{marginVertical: 10,
                          color: '#606060',
                          fontWeight:'700'}}> Evènement </Text>
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
            onPress={()=>requestPost()}
            > Ajouter </Button>
            </View>

        </ScrollView>);
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 0
    },
    container1: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20
    },
    header: {
        //backgroundColor : 'red',
        height: 50,
        width: '100%',
        marginTop: 50,
        paddingHorizontal: 10,
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputContainer  : {
        height: 150,
        width: '100%',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: '#bebcbc',
        marginVertical: 10,

    },
    dateBut : {
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: "center",
        padding: 15,
        borderColor: '#bebcbc',
        borderWidth: 1,
        marginBottom: 5,
        borderRadius: 50,
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
        color: '#606060',
    },
    button: {
        borderRadius: 50,
        height: 60,
        marginBottom: 20,
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
