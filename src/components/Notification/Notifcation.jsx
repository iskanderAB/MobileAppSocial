import React from 'react' ;
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import {StyleSheet , Text} from "react-native";
import { IconButton, Colors } from 'react-native-paper';

const LeftContent = () => <Avatar.Image  size={50} source={{uri:'https://pyxis.nymag.com/v1/imgs/7ad/fa0/4eb41a9408fb016d6eed17b1ffd1c4d515-07-jon-snow.rsquare.w330.jpg'}}/>
const Notification = () => {
    return (
        <Card style={styles.post}>
            <Card.Title title="Iskander AB" style={{paddingLeft :3}} subtitle={<Text style={{color:'black'}}> hello ennes el kol  </Text>} left={LeftContent} right={()=><Text style={styles.new}>new</Text>}/>

        </Card>
    );
}
const styles = StyleSheet.create({
    post : {
        marginTop : 10
    },
    new :{
        color : '#87ceeb',
        marginRight: 10
    }
})

export default Notification ;
