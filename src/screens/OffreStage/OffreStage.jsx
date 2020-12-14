import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    CheckBox,
    TouchableOpacity,
    Alert
} from "react-native";
import {Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import {MaterialIcons} from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import ImageUpload from "../../components/ImagePicker/ImageUpload";
import { Fontisto } from '@expo/vector-icons';
import { IconButton, Colors } from 'react-native-paper';
import { set } from "react-native-reanimated";
let ip ='192.168.43.207' ;

const offreStage = ({navigation}) => {
    const [loading , setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date());
    const [token ,setToken] = useState(null) ;
    const [sujet ,setSujet] = useState(null) ;
    const [discreption , setDiscreption] = useState(null);
    const [company , setCompany] = useState(null);
    const [email , setEmail] = useState(null);
    const [mode, setMode] = useState('date');

    const getData = async ()=> {
        await AsyncStorage.getItem('token').then(res => {
            setToken(res);
        } );
    }
    useEffect(()=> {
        getData();
    },[])

    function requestPost() {
        // // alert(`Donayla test  ${email}`);
        // let docToUpload = new FormData();
        // docToUpload.append('iskander_file',document);
        // console.log(docToUpload);
        let data = {
            content : email  + '--' + sujet + '--' + discreption ,
            type : 'event',
            date : date.getMonth()+'/'+date.getDate()+'/'+date.getFullYear(),
            title : company,
        };
        //console.log('[data]', data.type);
        setLoading(true);
        //console.log(data);
        axios.post(`http://${ip}:8001/api/addPost`,data,{
            headers:{
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then(function (response) {
            // handle success
            //console.log("Response =====> " , response.data);
            setTimeout(()=> navigation.navigate("Home"),500)
            setTimeout(()=>{
                Alert.alert(`Ajouter avec succée `);
                setCompany('');
                setSujet('');
                setDate(new Date());
                setEmail('');
                setDiscreption('');

                setLoading(false)},200);
        }).catch(error => {
            setLoading(false);
            // console.log('====================================');
            // console.log(error.response);
            // console.log('====================================');
            alert(`${error}`);
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

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.container1}>
            <View style={styles.inputContainer} >
                <TextInput
                       style={{textAlignVertical: 'top'}}
                       placeholder={'Sujet de stage'}
                       placeholderTextColor="grey"
                       numberOfLines={10}
                       multiline={true}
                       onChangeText={(text)=> setSujet(text)}
                />
        </View>

            <View style={styles.inputContainer} >
                <TextInput
                    style={{textAlignVertical: 'top'}}
                    placeholder={'Description'}
                    placeholderTextColor="grey"
                    numberOfLines={10}
                    multiline={true}
                    value={discreption}
                    onChangeText={(text)=> setDiscreption(text)}
                />
            </View>
        <View style={styles.file}>

        </View>
            <Text style={styles.text}> Nom de sociéte </Text>
            <TextInput placeholder={'Nom de sociéte'} style={{height: 50,
                width: '100%',
                borderWidth: 1,
                padding: 15,
                borderColor: '#bebcbc',
                marginBottom: 5,
                borderRadius: 50,}} 
                selectionColor={'red'}
                value={company}
                onChangeText={(text)=> setCompany(text)}
            />
            <Text style={styles.text}> Email de sociéte </Text>
            <TextInput placeholder={'Email de sociéte'} style={{height: 50,
                width: '100%',
                borderWidth: 1,
                padding: 15,
                borderColor: '#bebcbc',
                marginBottom: 5,
                borderRadius: 50,}} 
                selectionColor={'red'}
                value={email}
                onChangeText={(text)=> setEmail(text)}
            />

            <Text style={styles.text}> Date de debut </Text>

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

            {/* <View style={{top:-25}}>
            <Text style={styles.text}> Date de fin </Text>

                <TouchableOpacity style={styles.dateBut} onPress={showDatepicker}>
                    <Text style={{fontWeight:"700",color: '#606060'}}>{date.getMonth()}/{date.getDate()}/{date.getFullYear()}</Text>
                    <Fontisto name="date" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.text}> </Text>

            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange1}
                />
            )}
            </View> */}
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
        height: 100,
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
        borderRadius: 50,

    },
    datefin : {
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: "center",
        padding: 15,
        borderColor: '#bebcbc',
        borderWidth: 1,
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
        top: -30
    },
    label : {
        color: 'white'
    },
    textBottom : {
        flex: 1,
        justifyContent: 'center'
    },
    file :{
        flexDirection : 'row',
        alignItems : 'center'
    }
});
export default offreStage;