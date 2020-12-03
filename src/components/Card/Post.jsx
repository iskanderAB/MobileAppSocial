import React, {useState,useEffect} from 'react';
import {Avatar, Card, Title, Paragraph} from 'react-native-paper';
import {StyleSheet , Text,TouchableOpacity ,ActivityIndicator} from "react-native";
import { IconButton, Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const Post = ({avatar, userFullName , content ,postImage ,type , title }) => {
    const [love , setLove] = useState(false);
    const [participate , setParticipate] = useState(false);
    const LeftContent = () => <Avatar.Image  size={50} source={{uri:avatar}}/>
    const navigation = useNavigation();
    return (

        <Card  style={styles.post}  onPress={type === 'event' ? ()=>navigation.navigate('EventDetail') : null  } >
            <Card.Title title={userFullName} style={{paddingLeft :3}} subtitle="Il ya 2 heurs " left={LeftContent}/>
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
                <Text style={{paddingLeft:0,color: 'gray'}}> 25 </Text>
                { type === 'event' ?   <TouchableOpacity
                    style={{...styles.button,backgroundColor: participate ? '#50aeff' : "white",}}

                >
                    <Text style={{color : participate ? "white" : "#50aeff"}}>Participer</Text>
                </TouchableOpacity> : null }

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
