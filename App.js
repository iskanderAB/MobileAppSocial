import 'react-native-gesture-handler';
import React, { useState, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Alert  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import RootStackScreen from './src/screens/Root/Root';
import { ActivityIndicator } from 'react-native-paper';
import AuthContext from './src/components/Context/AuthContext'
import AppScreen from './src/screens/AppScreen/AppScreen';
import Updater from './updater/Updater';
import Axios from 'axios';

// let ip = '192.168.43.207';
let ip ='192.168.1.36';
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
    const [loginState, dispatch] = useReducer(loginReducer, initialLoginStat)

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
        userInformation : loginState
    }), []);
    
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
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
export default App; 