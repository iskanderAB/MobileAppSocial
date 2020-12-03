import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    CheckBox,
    TouchableOpacity,
    Image,
    Alert
} from "react-native";
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';

import moment from 'moment';

let ip = '192.168.43.207';

const EventDetail = ({route ,navigation}) => {
    const [isSelected,setSelection] = useState(false);
    const [loading , setLoading] = useState(false);
    const [token ,setToken] = useState(null) ;
    const [status, setStatus] = useState();
    const [nomEven, setNomEven] = useState();
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [document ,setDocument] = useState(null);
    const [nameOfFile , setNameOfFile] = useState(null);
    let dt = new Date(date);

    const { image, title, content , date ,allInterested,thisUser } = route.params;

    useEffect(()=> {
        console.log('intersteeeeed => ' , allInterested)
    });

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <Image
                style={styles.image}
                source={{
                    uri: image,
                }}
            />

            <View style={styles.container1}>
                <View >
                    <Text style={{marginVertical: 10,
                        color: '#606060',
                        fontWeight:'700',
                        fontSize:23}}> {title} </Text>

                    <Text style={styles.text}> {moment(date).format('ll')} </Text>
                    <Text style={styles.text}> {content} </Text>
                    {allInterested.length > 0 ?  allInterested.map((user,index) => {
                        if(thisUser !== user.email)
                            return(<Card style={{ marginTop : 10}}>
                                        <Card.Title title={user.nom+' '+user.prenom} style={{paddingLeft :3}} key={index} left={()=><Avatar.Image  size={50} source={{uri:`http://${ip}:8001/upload/user/${user.image}`}}/>}/>
                                    </Card>)
                    }) :
                    null}


                </View>
            </View>
        </ScrollView>);
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 0
    },
    container1: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20
    },
    image : {
      height : 300,
      width : "100%"
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
    inputContainer  : {
        height: 100,
        width: '100%',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: '#bebcbc',
        marginVertical: 10,

    },
    dateBut : {
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: "center",
        padding: 15,
        borderColor: '#bebcbc',
        borderWidth: 1,
        borderRadius: 50,

    },
    datefin : {
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: "center",
        padding: 15,
        borderColor: '#bebcbc',
        borderWidth: 1,
        borderRadius: 50,

    },
    input: {
        height:400,
        width: '100%',
        borderWidth: 1,
        padding: 15,
        borderColor: '#bebcbc',
        marginBottom: 5,
        borderRadius: 50,
    },
    text: {
        marginVertical: 10,
        color: '#606060',
    },
    button: {
        borderRadius: 50,
        height: 60,
        marginBottom: 20
    },
    label : {
        color: 'white'
    },
    textBottom : {
        flex: 1,
        justifyContent: 'center'
    },
    file :{
        flexDirection : 'row',
        alignItems : 'center'
    }
});
export default EventDetail;
