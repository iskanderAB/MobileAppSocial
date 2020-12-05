import 'react-native-gesture-handler';
import React, { useState, useEffect, useReducer,useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import RootStackScreen from './src/screens/Root/Root';
import { ActivityIndicator } from 'react-native-paper';
import AuthContext from './src/components/Context/AuthContext'
import AppScreen from './src/screens/AppScreen/AppScreen';
import Updater from './updater/Updater';
import Axios from 'axios';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { Platform } from 'react-native';



Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

// let ip = '192.168.43.207';
let ip ='192.168.43.207';
const MainStack = createStackNavigator();

const initialLoginStat = {
    isloading: true,
    userName: null,
    userToken: null
};

const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if (value !== null) {
            return value;
        }
    } catch (e) {
        console.log('[App.js]', error)
        return null;
    }
}

const loginReducer = (prevState, action) => {
    switch (action.Type) {
        case 'RETRIEVE_TOKEN':
            return Updater(prevState, { userToken: action.token, isloading: false , userToken : action.token });
        case 'LOGIN':
            return Updater(prevState, { userToken: action.token, isloading: false, userName: action.userName });
        case 'LOGOUT':
            AsyncStorage.removeItem('token');
            return Updater(prevState, { userToken: null, isloading: false, userName: null });
        default:
            break;
    }
}

const App = () => {
    const [isloading, setIsLoading] = useState(true);
    const [loginState, dispatch] = useReducer(loginReducer, initialLoginStat);
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();


    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    
        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
        });
    
        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          console.log(response);
        });
    
        return () => {
          Notifications.removeNotificationSubscription(notificationListener);
          Notifications.removeNotificationSubscription(responseListener);
        };
      }, []);

    const authContext = React.useMemo(() => ({
        signIn: async (username, password, loadingButton) => {
            await Axios.post(`http://${ip}:8001/api/login_check`, {
                "username": username,
                "password": password
            }).then(response => {
                try {
                    AsyncStorage.setItem('token', response.data.token);
                } catch (error) {
                    alert('problem loacal storage');
                }
                dispatch({ Type: 'LOGIN', userName: username, token: response.data.token });
                getData('token').then(res => console.log('token', res));
            }).catch(error => {
                console.log(error)
                Alert.alert(
                    "Connexion Error ",
                    error.message,
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: true }
                );
            });
            loadingButton(false);
            setIsLoading(false);
        },
        signOut: () => {
            setIsLoading(false);
            dispatch({ Type: 'LOGOUT', userName: null, token: null });
        },
        userInformation : loginState,
    }), []);
    

    useEffect(() =>{
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    },[])


    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1000);
    }, []);

   
    const backUpToken= () => { 
        if (loginState.userToken === null)
        setTimeout(async () => {
            let token ; 
            token = null ; 
            try{
                token = await AsyncStorage.getItem('token') ; 
            }catch(error){
                alert(error)
            }
            dispatch({Type:'RETRIEVE_TOKEN' ,token : token })
        },1000)
    }

    useEffect(() => {
        backUpToken();
    }, []);
    

    if (isloading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' color='#87ceeb' />
            </View>
        );
    }
    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {loginState.userToken == null
                    ?
                    <RootStackScreen/>
                    :
                    <AppScreen/>
                }
            </NavigationContainer>
        </AuthContext.Provider>
    );
};

async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Original Title',
      body: 'And here is the body!',
      data: { data: 'goes here' },
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }
  
  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

export default App; 