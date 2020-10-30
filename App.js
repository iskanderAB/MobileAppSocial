import 'react-native-gesture-handler';
import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from "./src/screens/Home/Home";

function HomeScreen() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Home!</Text>
        </View>
    );
}

function Chat() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Chat!</Text>
        </View>
    );
}

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
                        } else if (route.name === 'Chat') {
                            iconName = focused ? 'chatbubble-outline' : 'chatbubble-sharp';
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                }}

            >
                <Tab.Screen name="Home" component={Home}/>
                <Tab.Screen name="Chat" component={Chat}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}
