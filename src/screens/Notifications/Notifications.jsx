import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, Text,Switch, View, RefreshControl} from "react-native";
import Notification from "../../components/Notification/Notifcation";
import Post from "../../components/Card/Post";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";

let ip ='192.168.1.12' ;

const Notifications = () => {
    const [refreshing, setRefreshing] = useState(true);
    const [token ,setToken] = useState(null) ;
    const [posts,setPosts] = useState(null);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = async () => setIsEnabled(previousState => !previousState);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getData(token)

    }, []);

    const getData = async (token) => {
        await AsyncStorage.getItem('token').then(res => {
            Axios.get(`http://${ip}:8001/api/posts`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                setPosts(response.data.map(v=>v).reverse());
                console.log( typeof response.data)
                setRefreshing(false)
            }).catch(error => console.log("\n", error.response));
            setToken(res);
        });
        console.log('tooooken => ', token);

    }
    useEffect(() => {
        getData(token)
    }, [token]);

    return (
        <View  style={styles.container} >
            <View style={styles.header}>
                <Text style={styles.text}> Notifications </Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
            <View style={{flexDirection: 'row',alignItems: 'center'}} >
                <Text style={{color:"#d6d6d6",fontWeight: 'bold'}}> Derniers Notifications</Text>
                <View style={styles.line}/>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }            >
                {posts ?
                    posts.map((post , index) => {
                        return <Notification key={index} avatar={`http://${ip}:8001/upload/user/${post.createdBy.image}`}  content={post.content}  userFullName={post.createdBy.nom+' '+post.createdBy.prenom}/> })
                    :
                    null
                }
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container : {
        backgroundColor : 'white',
        flex : 1,
        paddingHorizontal : 0
    },
    header : {
        //backgroundColor : 'red',
        height : 50,
        width : '100%',
        marginTop: 50,
        paddingHorizontal : 10,
        alignSelf : 'center',
        alignItems : 'center',
        flexDirection : 'row',
        justifyContent : 'space-between',
    },
    text : {
        fontWeight : 'bold',
        fontSize : 20
    },
    line: {
        top : 3 ,
        borderBottomWidth : 1,
        borderColor: '#ddd',
        flex: 1,
        marginLeft : 5
    }
});
export default Notifications;
