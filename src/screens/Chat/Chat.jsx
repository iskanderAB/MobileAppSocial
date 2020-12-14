// @refresh reset
import { StatusBar } from 'expo-status-bar';
import React , {useState, useEffect, useCallback} from 'react';
import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-community/async-storage';
import {StyleSheet, Text, TextInput, View, LogBox, Button, FlatList, ActivityIndicator} from 'react-native';
import * as firebase from 'firebase';
import Axios from 'axios';
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBcQ2B7YUnY7iuHOLflpFlnw99qK1Orpko",
    authDomain: "react-native-chat-d13ee.firebaseapp.com",
    databaseURL: "https://react-native-chat-d13ee.firebaseio.com",
    projectId: "react-native-chat-d13ee",
    storageBucket: "react-native-chat-d13ee.appspot.com",
    messagingSenderId: "225354470560",
    appId: "1:225354470560:web:cc9f4abac063bbc304a5c5"
};

if(firebase.apps.length === 0) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}

LogBox.ignoreLogs(['Setting a timer']);

const db = firebase.firestore();

const chatsRef = db.collection('chats');
let ip ='192.168.43.207' ;
const Chat = () =>  {
    const [user, setUser] = useState(null);
    const [name, setName] = useState('iskander');
    const [messages, setMessages] = useState([]);
    const [token ,setToken] = useState(null) ;


    const getData = async ()=> {
        await AsyncStorage.getItem('token').then(res => {
            setToken(res);
        } );
        console.log('tooooken => ' , token);
        await Axios.get(`http://${ip}:8001/api/user`,{
            headers : {
                Authorization: `Bearer ${token}`
            }
        }).then(response=> {
           const user = {_id:response.data.id, name:response.data.nom}
           setUser(user);
           console.log('userrrr' , user);
        }).catch(error => {
            console.log(error)
        });

    }
    useEffect(() => {
        getData();
        const unsubscribe = chatsRef.onSnapshot(querySnapshot => {
            const messagesFirestore = querySnapshot.docChanges()
                .filter(({type}) => type === 'added')
                .map(({doc}) => {
                    const message  = doc.data();
                    console.log( 'message' , message);
                    return {...message, createdAt: message.createdAt.toDate() }
                })
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            appendMessages(messagesFirestore)
        })
        return () => unsubscribe()
    },[token]);

    const appendMessages = useCallback((messages) => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
    }, [messages])

    // async function readUser() {
    //     const _id = Math.random().toString(36).substring(7)
    //     const user = {_id, name}
    //     // await AsyncStorage.setItem('user', JSON.stringify(user));
    //     // const user = await AsyncStorage.getItem('user');
    //     if (user) {
    //         setUser(user)
    //     }
    //     alert(JSON.stringify(user))
    // }

    async function handlePress() {
        const _id = Math.random().toString(36).substring(7)
        const user = {_id, name }
        await AsyncStorage.setItem('user', JSON.stringify(user));
        setUser(user);
    }

    async function handleSend (messages) {
        const writes = messages.map(m => chatsRef.add(m))
        await Promise.all(writes)
    }

    // if(!user) {
    //     return (
    //         <LoginScreen value={name} onChangeText={setName} onPress={handlePress}/>
    //     )
    // }

    return (//<GiftedChat isTyping={true} showUserAvatar={false} messages={props.messages} user={props.user} onSend={props.onSend} />
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{fontWeight:'bold',fontSize:30,marginBottom :10}}> Chat </Text>
            </View>
         {user !== null ?
             <GiftedChat messages={messages} user={user} onSend={handleSend} /> 
             : 
             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' color='#87ceeb' />
            </View>
             }   
         
        </View>
        //  <UsersScreen messages={messages}/>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        paddingHorizontal: 0
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
        borderBottomWidth : 1,
        borderBottomColor : '#cfcfe1'
    },
    input : {
        height : 50,
        width : '100%',
        borderWidth : 1,
        padding : 15,
        borderColor : 'grey',
        marginBottom : 20
    }
});
export default Chat;
