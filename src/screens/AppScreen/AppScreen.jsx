import React  from 'react' ;
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Chat from '../Chat/Chat';
import Profile from '../Profile/Profile';
import { Octicons, MaterialIcons, Entypo } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeStackScreen from '../HomeStackScreen/HomeStackScreen';
import Post from "../Post/Post";
import Others from '../OthersScreen/Others';

const Tab = createBottomTabNavigator();
const AppScreen = (props) => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = 'md-home'
                    } else if (route.name === 'Chat') {
                        iconName = 'ios-chatbubbles';
                    }
                    else if (route.name === 'Add') {
                        return <Octicons name="diff-added" size={37} color={color} />
                    } else if (route.name === 'Profile') {
                        return <MaterialIcons name="person-outline" size={37} color={color} />
                    } else if (route.name === 'Settings') {
                        return <Entypo name="dots-three-vertical" size={30} color={color} />
                    }
                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={37} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: '#00BFFF',
                inactiveTintColor: 'gray',
                showLabel: false
            }}>
            <Tab.Screen name="Home" component={HomeStackScreen} />
            <Tab.Screen name="Chat" component={Chat} />
            <Tab.Screen name='Add' component={Post} />
            <Tab.Screen name='Profile' component={Profile} />
            <Tab.Screen name='Settings' component={Others} />
        </Tab.Navigator>
    );
}
export default AppScreen ;
