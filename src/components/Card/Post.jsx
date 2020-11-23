import React, {useState} from 'react';
import {Avatar, Card, Title, Paragraph} from 'react-native-paper';
import {StyleSheet , Text,TouchableOpacity} from "react-native";
import { IconButton, Colors } from 'react-native-paper';

const LeftContent = () => <Avatar.Image  size={50} source={{uri:'https://scontent.ftun10-1.fna.fbcdn.net/v/t1.0-9/53429963_853746661639120_9010173747226738688_n.jpg?_nc_cat=107&ccb=2&_nc_sid=09cbfe&_nc_ohc=3Tuc8RRRuRAAX_l43R6&_nc_ht=scontent.ftun10-1.fna&oh=8bb914fe0c2abf0956d509087adcc332&oe=5FDFA015'}}/>
const Post = () => {
    const [love , setLove] = useState(false);
    const [participate , setParticipate] = useState(false);

    return (
        <Card style={styles.post}>
            <Card.Title title="Smart Tech" style={{paddingLeft :3}} subtitle="Il ya 2 heurs " left={LeftContent}/>
            <Card.Content style={{paddingHorizontal :5}}>
                <Paragraph>Download and use TextNow on any device to get a free phone number, and call and text anywhere in North America for free</Paragraph>
            </Card.Content>
            <Card.Cover source={{uri: 'https://scontent.ftun10-1.fna.fbcdn.net/v/t1.0-9/54217402_853733404973779_1670910464768344064_n.jpg?_nc_cat=109&ccb=2&_nc_sid=8bfeb9&_nc_ohc=2eaLhMX8DS4AX-RiPvX&_nc_ht=scontent.ftun10-1.fna&oh=480ff61eba92d8e7c1f4b73fa845495b&oe=5FDFC8E1'}}/>
            <Card.Actions style={{padding:0,flexDirection:'row'}}>
                <IconButton
                    icon={love ? 'heart' : 'heart-outline'}
                    //heart-outline
                    color={Colors.red500}
                    size={35}
                    onPress={() => setLove(!love)}
                    style={{marginLeft : 0}}
                />
                <Text style={{paddingLeft:0}}> 25 </Text>
                <TouchableOpacity
                    style={{...styles.button,backgroundColor: participate ? '#50aeff' : "white",}}
                    onPress={()=>setParticipate(!participate)}
                >
                    <Text style={{color : participate ? "white" : "#50aeff"}}>Participer</Text>
                </TouchableOpacity>
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
    }
})
export default Post;
