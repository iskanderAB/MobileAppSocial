import React from 'react' ;
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import {StyleSheet , Text} from "react-native";
import { IconButton, Colors } from 'react-native-paper';





const Notification = ({avatar, userFullName , content }) => {

    const LeftContent = () => <Avatar.Image  size={50} source={{uri:avatar}}/>
    const RightContent = () => <Text style={styles.new}>new</Text>

    return (
        <Card style={styles.post}>
            <Card.Title title={userFullName} style={{paddingLeft :3}} subtitle={<Text style={{color:'black'}}>{content}</Text>} left={LeftContent} right={RightContent}/>
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
