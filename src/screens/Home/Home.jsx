import React, {useEffect, useState} from 'react';
import  {StyleSheet, ScrollView, Text, View, Pressable,RefreshControl,} from "react-native";
import Post from "../../components/Card/Post";
import {MaterialIcons} from '@expo/vector-icons';
import {Avatar} from "react-native-paper";
const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}
const Home = ({navigation}) =>  {
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);
    console.log(navigation);
    const [notificationBackColor , setNotificationBackColor] = useState('red');

    useEffect(()=>{

    });
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text}> Accueil </Text>
                <Pressable
                    onPress={() => {
                        setTimeout(()=> navigation.navigate('Notifications'));
                    }}>
                    {({ pressed }) => (
                        <MaterialIcons
                            style={{backgroundColor:  pressed ? '#F5E6E6' : '#FFFFFF',borderRadius:50}}
                            name="notifications-none"
                            size={30} color="black"
                        />
                    )}
                </Pressable>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }            >
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        paddingHorizontal: 0
    },
    header: {
        //backgroundColor : 'red',
        height: 50,
        width: '100%',
        marginTop: 50,
        paddingHorizontal: 10,
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20
    },
    line: {
        top: 3,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        flex: 1,
        marginLeft: 5
    },
});
export default Home;
