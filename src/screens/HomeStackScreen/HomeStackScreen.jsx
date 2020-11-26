import React from 'react' ;
import { createStackNavigator } from "@react-navigation/stack";
import Notifications from "../Notifications/Notifications";
import Home from '../Home/Home';
import UpdateProfile from "../UpdateProfile/UpdateProfile";
import UpdatePost from "../UpdatePost/UpdatePost";

const HomeStack = createStackNavigator();
const HomeStackScreen = (props) => {
    return (
        <HomeStack.Navigator >
            <HomeStack.Screen name={'HomePage'}
                options={{
                    title: "Home",
                    headerShown: false,
                }}
                component={Home} />
            <HomeStack.Screen name={'Parametres'}
                              options={{
                                  title: "Paramétres",
                                  headerShown: true,
                              }}
                              component={UpdateProfile} />
            <HomeStack.Screen name={'UpdatePost'}
                              options={{
                                  title: "Modifier Status",
                                  headerShown: true,
                              }}
                              component={UpdatePost} />

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
                component={Notifications} />
        </HomeStack.Navigator>
    );
};
export default HomeStackScreen ;
