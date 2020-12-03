import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Notifications from "../Notifications/Notifications";
import Home from '../Home/Home';
import UpdateProfile from "../UpdateProfile/UpdateProfile";
import UpdatePost from "../UpdatePost/UpdatePost";
import Stat from '../Stat/Stat';
import OffreStage from '../OffreStage/OffreStage';
import EventDetail from '../Event/EventDetail';

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
                    title: "Modifier",
                    headerShown: true,
                }}
                component={UpdatePost} />
            <HomeStack.Screen name={'Stat'}
                options={{
                    title: "Modifier Status",
                    headerShown: true,
                }}
                component={Stat} />
            <HomeStack.Screen name={'Offre'}
                options={{
                    title: "Offre de stage ",
                    headerShown: true,
                }}
                component={OffreStage} />
             <HomeStack.Screen name={'Event'}
                options={{
                    title: "Evènement",
                    headerShown: true,
                }}
                component={EventDetail} />

            <HomeStack.Screen name={'EventDetail'}
                              options={{
                                  title: " EventDetail",
                                  headerShown: true,
                              }}
                              component={EventDetail} />

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
export default HomeStackScreen;
