import React ,{useContext, useEffect, useState} from 'react' ;
import {StyleSheet, ScrollView, Text, View ,ActivityIndicator, RefreshControl} from "react-native";
import Axios from 'axios';
import {Avatar} from "react-native-paper";
import Post from "../../components/Card/Post";
import AuthContext from '../../components/Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


let ip ='192.168.43.207' ;
const Profile = () => {
    const [image , setImage] = useState();
    const [token ,setToken] = useState(null) ;
    const [name , setName] = useState(null);
    const [classe , setClasse] = useState(null);
    const [posts,setPosts] = useState(null);
    const [id , setId] = useState(null) ; 
    const [refreshing, setRefreshing] = useState(true);

    const getData = async (token)=> {
        await AsyncStorage.getItem('token').then(res => {
            setToken(res);
        } );
        console.log('tooooken => ' , token);
        await Axios.get(`http://${ip}:8001/api/user`,{
            headers : {
                Authorization: `Bearer ${token}`
            }
        }).then(response=> {
            setImage(`http://${ip}:8001/upload/user/${response.data.image}`);
            setName(response.data.nom);
            setClasse(response.data.classe);
            setId(response.data.id)
        }).catch(error => {
            console.log(error)
        });
        await Axios.get(`http://${ip}:8001/api/posts`,{
            headers : {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setPosts(response.data.map(v=>v).reverse());
        }).catch(error => console.log("\n",error));
        setRefreshing(false);
    }
    const onRefresh = React.useCallback(() => {
        console.log(token);
        setRefreshing(true);
        getData(token);
    }, []);
    useEffect(() => {
            getData(token)
    },[token]);

    return (  <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.text}> Profile </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}  
                    refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }             >
            {image === null ? <ActivityIndicator style={styles.image}/> :  <Avatar.Image size={150} style={styles.image}
                        source={{uri:image}}/>
            }
            <Text style={styles.textName}> {name} </Text>
            { classe == null || classe.split(" ").join("") === '' ?  <Text style={styles.textProfileType}>Enseignante</Text> : <Text style={styles.textProfileType}> Etudiant</Text>}
            <Text style={styles.textClass}> {classe} </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color: "#d6d6d6", fontWeight: 'bold'}}> Mes Derniers statuts </Text><View
                style={styles.line}></View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} invertStickyHeaders={true}>
                {posts ? 
                    posts.filter(post=> post.createdBy.id === id).map((post , index) => {
                       return <Post key={index} type={post.type} title={post.title} avatar={`http://${ip}:8001/upload/user/${post.createdBy.image}`} content={post.content} postImage={`http://${ip}:8001/upload/user/posts/${post.image}`}  userFullName={post.createdBy.nom+' '+post.createdBy.prenom  } /> })
                :
                    <ActivityIndicator  size='small'/>
                }
               
            </ScrollView>
        </ScrollView>
    </View>);
}
  
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
    image: {
        alignSelf: 'center'
    },
    textName: {
        fontWeight: 'bold',
        fontSize: 22,
        alignSelf: 'center'
    },
    textProfileType: {
        fontSize: 20,
        color: '#87ceeb',
        alignSelf: 'center'
    },
    textClass: {
        fontSize: 18,
        alignSelf: 'center'
    }
});
export default Profile;


// <Post avatar={image} content={content} userImage={userImage} userFullName={userFullName} />