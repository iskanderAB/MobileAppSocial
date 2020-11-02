import React, {useState} from 'react';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import {StyleSheet , Text} from "react-native";
import { IconButton, Colors } from 'react-native-paper';

const LeftContent = () => <Avatar.Image  size={50} source={{uri:'https://pyxis.nymag.com/v1/imgs/7ad/fa0/4eb41a9408fb016d6eed17b1ffd1c4d515-07-jon-snow.rsquare.w330.jpg'}}/>
const Post = () => {
    const [love , setLove] = useState(false);

    return (
        <Card style={styles.post}>
            <Card.Title title="Iskander AB" style={{paddingLeft :3}} subtitle="Il ya 2 heurs " left={LeftContent}/>
            <Card.Content style={{paddingHorizontal :5}}>
                <Paragraph>Download and use TextNow on any device to get a free phone number, and call and text anywhere in North America for free</Paragraph>
            </Card.Content>
            <Card.Cover source={{uri: 'https://picsum.photos/700'}}/>
            <Card.Actions style={{padding:0}}>
                <IconButton
                    icon={love ? 'heart' : 'heart-outline'}
                    //heart-outline
                    color={Colors.red500}
                    size={35}
                    onPress={() => setLove(!love)}
                    style={{marginLeft : 0}}
                />
                <Text style={{paddingLeft:0}}> 25 </Text>
            </Card.Actions>
        </Card>
    );
}
const styles = StyleSheet.create({
    post : {
        marginTop : 10
    }
})
export default Post;
