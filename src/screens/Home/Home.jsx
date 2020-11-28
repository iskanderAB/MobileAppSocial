import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Text, View, Pressable, RefreshControl, ActivityIndicator} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import Post from "../../components/Card/Post";
import { MaterialIcons } from '@expo/vector-icons';


let ip ='192.168.1.36' ;
const Home = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(true);
    const [token ,setToken] = useState(null) ;
    const [posts,setPosts] = useState(null);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getData(token)
    }, []);

    const getData = async (token) => {
        await AsyncStorage.getItem('token').then(res => {
            setToken(res);
        });
        console.log('tooooken => ', token);
        await Axios.get(`http://${ip}:8001/api/posts`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setPosts(response.data.map(v=>v).reverse());
            console.log( typeof response.data)
            setRefreshing(false)
        }).catch(error => console.log("\n", error.response));
    }
    useEffect(() => {
        getData(token)
    }, [token]);

    console.log(posts);
    console.log(navigation);
    const [notificationBackColor, setNotificationBackColor] = useState('red');
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text}> Accueil </Text>
                <Pressable
                    onPress={() => {
                        setTimeout(() => navigation.navigate('Notifications'));
                    }}>
                    {({ pressed }) => (
                        <MaterialIcons
                            style={{ backgroundColor: pressed ? '#F5E6E6' : '#FFFFFF', borderRadius: 50 }}
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
                {posts ?
                     posts.map((post , index) => {
                       return <Post key={index} title={post.title} avatar={`http://${ip}:8001/upload/user/${post.createdBy.image}`}  content={post.content} postImage={`http://${ip}:8001/upload/user/posts/${post.image}`}  userFullName={post.createdBy.nom+' '+post.createdBy.prenom  } type={post.type} /> })
                :
                null
                }
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
