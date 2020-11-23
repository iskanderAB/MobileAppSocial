import 'react-native-gesture-handler';
import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Octicons ,MaterialIcons ,Entypo  } from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Notifications from "./src/screens/Notifications/Notifications";
import Home from "./src/screens/Home/Home";
import {createStackNavigator} from "@react-navigation/stack";
import Profile from "./src/screens/Profile/Profile";
import Chat from "./src/screens/Chat/Chat";
import Register from "./src/screens/Register/Refgister";




const HomeStack = createStackNavigator();
const HomeStackScreen = (props) =>{
    return(
        <HomeStack.Navigator >
            <HomeStack.Screen name={'HomePage'}
                              options={{
                                    title: "Home",
                                    headerShown: false,
                              }}
                              component={Home}/>
            <HomeStack.Screen name={'Notifications'}
                                 options={{
                                   headerShown: false
                                  /*headerRight : () =>(<Ionicons
                                      name={'md-close-circle-outline'}
                                      /!*onPress={() => props.navigation.navigate('HomePage',{go_back_key:props.route.key})}*!/
                                      size={30}
                                      color={'black'}/>),
                                      headerRightContainerStyle:{
                                      paddingRight : 15
                                  },
                                   headerLeft : null,

                                   headerLeftContainerStyle:{
                                       padding:0
                                   },
                                   headerTitleStyle:{
                                       alignSelf : 'flex-start',
                                       marginLeft: -13
                                   }*/
                              }}
                              component={Notifications}/>
        </HomeStack.Navigator>
    );
};

const Tab = createBottomTabNavigator();
const TabNavigation = (props) => {
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
                    else if (route.name ==='Add'){
                        return <Octicons name="diff-added" size={37} color={color} />
                    }else if(route.name ==='Profile'){
                        return <MaterialIcons name="person-outline" size={37} color={color} />
                    }else if(route.name ==='Settings'){
                        return <Entypo name="dots-three-vertical" size={30} color={color} />
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={37} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: '#00BFFF',
                inactiveTintColor: 'gray',
                showLabel :false
            }}>
            <Tab.Screen name="Home"  component={HomeStackScreen}/>
            <Tab.Screen name="Chat" component={Chat}/>
            <Tab.Screen name='Add' component={Chat} />
            <Tab.Screen name='Profile' component={Profile}/>
            <Tab.Screen name='Settings' component={Chat}/>
        </Tab.Navigator>
    );
}
const MainStack = createStackNavigator();
export default function App() {
    return (
        <NavigationContainer>
            <MainStack.Navigator>
                <MainStack.Screen name={'Inscription'}
                                  component={Register}/>
                {/*<MainStack.Screen name={'App'}*/}
                {/*                  component={TabNavigation}/>*/}
            </MainStack.Navigator>
            {TabNavigation}
        </NavigationContainer>
    );
}
