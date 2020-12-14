import React, {useState,useEffect} from 'react';
import {Avatar, Card, Title, Paragraph} from 'react-native-paper';
import {StyleSheet , Text,TouchableOpacity ,ActivityIndicator , View,Linking} from "react-native";
import * as WebBrowser from 'expo-web-browser';
import { IconButton, Colors } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons'; 
import jwt_decode from "jwt-decode";
import moment from 'moment';

const Post = ({navigation,avatar,allInterested , attachment, email,userFullName , content ,postImage , createdAt ,type ,title,id,loveRequest,loved,token , participateRequest ,interested,date}) => {
    const [love , setLove] = useState(loved.includes(jwt_decode(token).username));
    const [participate , setParticipate] = useState(interested.includes(jwt_decode(token).username));
    const [lovers , setLovers]= useState(loved.length); 
    const LeftContent = () => <Avatar.Image  size={50} source={{uri:avatar}}/>
    useEffect(()=> {
      console.log('loveeeee' , loved.includes(jwt_decode(token).username))
    },[love])

    const isLoved = () => {
        if(love){
            setLovers(lovers - 1 );
        }else{
            setLovers(lovers + 1);
        }
        setLove(!love); 
        loveRequest(id);
    }

    useEffect(()=>{
        console.log('posteImage', typeof postImage.replace('http://192.168.43.207:8001/upload/user/posts/',''))
        console.log('attachment', attachment);
        console.log('contents => ' , content.split('--').length);

    });
    const isParticipate = () => {
        participateRequest(id);
        setParticipate(!participate);
    }
    const  _handleOpenWithLinking = (url) => {
        Linking.openURL(url);
      };
    
    const   _handleOpenWithWebBrowser = () => {
        WebBrowser.openBrowserAsync('https://expo.io');
      };
    return (
        <Card style={styles.post} onPress={type === 'event' ? ()=> navigation.navigate('Event', {
            image: postImage.replace('http://192.168.43.207:8001/upload/user/posts/','') === 'null' ? 'http://192.168.43.207:8001/upload/user/posts/stagee.jpg': postImage ,
            title: title,
            content : content,
            date : date,
            allInterested : allInterested,
            thisUser : jwt_decode(token).username,

        }) : null  } >
            <Card.Title title={userFullName} style={{paddingLeft :3}} subtitle={moment(createdAt).format('ll')} left={LeftContent} right={()=> email === jwt_decode(token).username ?  <AntDesign name="edit" style={{marginRight : 10 }} 
            onPress={
            ()=> navigation.navigate("UpdatePost",{
            updateImage : postImage,
            updateTitle: title,
            updateContent : content,
            updateType : type,
            updateDate : date,
            id :id,
            token : token
             })
            } 
            size={24} color="black" /> : null}/>
            <Card.Content style={{paddingHorizontal :5}}>
                { type === 'event' ?  <Text style={styles.text}> {title} </Text> : null }
                {content.split('--').length ===3 ? 
                <>
                <Text style={{color :'gray'}}>Offres d'emploi Stage</Text> 
                <Text>Email :  {content.split('--')[0]} </Text>
                <Text>Sujet :  {content.split('--')[1]} </Text>
                <Text>Discreption :  {content.split('--')[2]} </Text>
                </>
                :
                <Paragraph>{content}</Paragraph> }
            {attachment !== null ?  <TouchableOpacity 
             onPress={()=> { 
                _handleOpenWithLinking('http://192.168.43.207:8001/upload/user/posts/'+attachment);
                // await WebBrowser.openBrowserAsync('http://192.168.43.207:8001/upload/user/posts/'+attachment)
             }}
             style={{backgroundColor : '#F9F9F9',height :80,flexDirection:'row' ,alignItems :'center'}}><AntDesign name="filetext1"  size={40} color="#636363" /><Text>{attachment}</Text></TouchableOpacity> : null}
            </Card.Content>
            {postImage.replace('http://192.168.43.207:8001/upload/user/posts/','') !== 'null' ? <Card.Cover  source={{uri:postImage}} /> : null } 
            <Card.Actions style={{padding:0,flexDirection:'row'}}>
                <IconButton
                    icon={love ? 'heart' : 'heart-outline'}
                    //heart-outline
                    color={Colors.red500}
                    size={35}
                    onPress={isLoved}
                    style={{marginLeft : 0}}
                />
                <Text style={{paddingLeft:0,color: 'gray'}}> {lovers} </Text>
                {type === 'event' && content.split('--').length ===1 ? 
                    <TouchableOpacity
                        style={{...styles.button,backgroundColor: participate ? '#50aeff' : "white",}}
                        onPress={isParticipate}
                    >
                        <Text style={{color : participate ? "white" : "#50aeff"}}>Participer</Text>
                    </TouchableOpacity>
                :
                    null
                }
            </Card.Actions>
        </Card>

    );
}
const styles = StyleSheet.create({
    post : {
        marginTop : 10
    },
    button:{
        padding :6,
        paddingHorizontal : 8 ,
        borderRadius : 50,
        marginLeft : 'auto',
        marginRight : 10,
        borderWidth : 2 ,
        borderColor : '#50aeff'
    },
    text: {
        color: '#33A8FF',
        fontSize : 12,
        fontWeight :'bold',
        fontStyle : 'italic',
        textDecorationLine : 'underline'

    }
})
export default Post;
