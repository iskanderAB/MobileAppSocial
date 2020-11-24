import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import RootStackScreen from './src/screens/Root/Root';
import { ActivityIndicator } from 'react-native-paper';
import { AuthContext } from './src/components/Context/AuthContext'
import AppScreen from './src/screens/AppScreen/AppScreen';



const MainStack = createStackNavigator();
const App = () => {

    const [isloading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);
    const authContext = React.useMemo(() => ({
        signIn: () => {
            setIsLoading(false);
            setUserToken('token_XXXX');
        },
        signOut: () => {
            setIsLoading(false);
            setUserToken(null);
        },
        signUp: () => {
            setIsLoading(false);
            setUserToken("token_XXX");
        }
    }));


    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 10000)
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
                {   userToken == null
                        ?
                        <RootStackScreen /> 
                        :
                        <AppScreen/>
                }
            </NavigationContainer>
        </AuthContext.Provider>
    );
};
export default App; 