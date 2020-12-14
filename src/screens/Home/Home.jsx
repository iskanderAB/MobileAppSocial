import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Text, View, Pressable, RefreshControl, ActivityIndicator, Alert } from "react-native";
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import Post from "../../components/Card/Post";
import { MaterialIcons } from '@expo/vector-icons';
import jwt_decode from "jwt-decode";


let ip = '192.168.43.207';


const Home = ({ navigation ,route}) => {
    const [refreshing, setRefreshing] = useState(true);
    const [token, setToken] = useState(null);
    const [posts, setPosts] = useState([]);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        //alert(token)
        getData();
    }, []);
    const getData = async () => {
        await AsyncStorage.getItem('token').then(res => {
                setToken(res);
            });
        setRefreshing(true)
        console.log('tooooken => ', token);
        setPosts([]);
        await Axios.get(`http://${ip}:8001/api/posts`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setPosts(response.data.map(v => v).reverse());
            //alert(JSON.stringify(posts))
            console.log('postes => ' , response.data)
            setRefreshing(false)
        }).catch(error => {
            setRefreshing(false);
            //alert("erreur de connexion ! ");
            //console.log("\n", error.response)
        });
    }

    useEffect(() => {
        getData();        
    }, []);

    const loveRequest = async (id) => {
        //console.log("Request !! ")
        await Axios.post(`http://${ip}:8001/api/love`, { postId: id }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            // handle success
            //console.log("Response =====> ", response.data);
        }).catch(error => {
            //console.log('====================================');
            console.log(error.response);
            //console.log('====================================');
        });
    }

    const participateRequest = async (id) => {
        //console.log("hello")
        await Axios.post(`http://${ip}:8001/api/participate`, { postId: id }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            // handle success
            //alert(`${response.data}`)
            //console.log("Response =====> ", response.data);
        }).catch(error => {
            //console.log('====================================');
            //console.log(error.response);
            //console.log('====================================');
            alert(`${error}`);
        });
    }
    
    // console.log(posts);
    // console.log(navigation);
    
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
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} style={{ height: '100%', backgroundColor: 'red' }} />
                } >
            
            {posts !== [] ?
                    posts.map((post, index) => {
                        return <Post key={index} attachment={post.attachment} createdAt={post.createdAt} title={post.title} email={post.createdBy.email} date={post.date} navigation={navigation} avatar={`http://${ip}:8001/upload/user/${post.createdBy.image}`} id={post.id} content={post.content} postImage={`http://${ip}:8001/upload/user/posts/${post.image}`} userFullName={post.createdBy.nom + ' ' + post.createdBy.prenom} type={post.type} participateRequest={participateRequest} interested={post.interested.map(v => v.email)}  allInterested={post.interested}  loveRequest={loveRequest} loved={post.Lovers.map(v => v.email)} token={token}  />
                    })
                    :
                    <Text style={{...styles.text,alignSelf : 'center',justifyContent :'center',color:'gray',marginTop:150}}> Aucune donnée ... </Text>
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
