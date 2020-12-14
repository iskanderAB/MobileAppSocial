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

let ip ='192.168.43.207';
const Post = ({navigation}) => {
    const [isSelected,setSelection] = useState(false);
    const [loading , setLoading] = useState(false);
    const [token ,setToken] = useState(null) ;
    const [status, setStatus] = useState();
    const [nomEven, setNomEven] = useState();
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [image , setImage] = useState(null);
    const [document ,setDocument] = useState(null);
    const [nameOfFile , setNameOfFile] = useState(null);

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
        let data = isSelected ===true ? {
            content : status,
            type : 'event',
            image : image ?  image.base64 : null ,
            date : date.getMonth()+'/'+date.getDate()+'/'+date.getFullYear(),
            title : nomEven,
        }:
        {
            content : status ,
            type : 'post',
            image :  image ?  image.base64 : null,
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
                                    onChangeText={(text)=> setNomEven(text)}/>
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

        <ImageUpload image={image} setImage={setImage} />

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
    },
    file :{
        flexDirection : 'row',
        alignItems : 'center'
    }
});
export default Post;
