import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../Login/Login';
import Register from '../Register/Refgister';
import UpdateProfile from "../UpdateProfile/UpdateProfile";



const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator >
        <RootStack.Screen name={'Se connecter'} options={{headerTitleStyle: {alignSelf: 'center'}}}component={LoginScreen} />
        <RootStack.Screen name={'Inscription'} component={Register}/>
    </RootStack.Navigator>
);

export default RootStackScreen;
