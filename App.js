import 'react-native-gesture-handler';
import React, { useState, useEffect, useReducer,useRef } from 'react';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Alert,Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import RootStackScreen from './src/screens/Root/Root';
import { ActivityIndicator } from 'react-native-paper';
import AuthContext from './src/components/Context/AuthContext'
import AppScreen from './src/screens/AppScreen/AppScreen';
import Updater from './updater/Updater';
import Axios from 'axios';

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
    
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1000);
    }, []);

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
        });
    
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          console.log(response);
        });
    
        return () => {
          Notifications.removeNotificationSubscription(notificationListener);
          Notifications.removeNotificationSubscription(responseListener);
        };
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

async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: 'Here is the notification body',
        data: { data: 'goes here' },
      },
      trigger: { seconds: 2 },
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
      console.log('notiff ' ,token);
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