import React, {useState,useEffect} from 'react';
import {Avatar, Card, Title, Paragraph} from 'react-native-paper';
import {StyleSheet , Text,TouchableOpacity ,ActivityIndicator} from "react-native";
import { IconButton, Colors } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons'; 
import jwt_decode from "jwt-decode";

const Post = ({navigation,avatar,allInterested, email,userFullName , content ,postImage ,type ,title,id,loveRequest,loved,token , participateRequest ,interested,date}) => {
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

    const isParticipate = () => {
        participateRequest(id);
        setParticipate(!participate);
    }
    
    return (
        <Card style={styles.post} onPress={type === 'event' ? ()=> navigation.navigate('Event', {
            image: postImage,
            title: title,
            content : content,
            date : date,
            allInterested : allInterested,
            thisUser : jwt_decode(token).username,

        }) : null  } >
            <Card.Title title={userFullName} style={{paddingLeft :3}} subtitle="Il ya 2 heurs " left={LeftContent} right={()=> email === jwt_decode(token).username ?  <AntDesign name="edit" style={{marginRight : 10 }} 
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
                <Paragraph>{content}</Paragraph>
            </Card.Content>
            <Card.Cover  source={{uri:postImage}}  />
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
                {type === 'event' ? 
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
