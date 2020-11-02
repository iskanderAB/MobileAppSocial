import React from 'react';
import {StyleSheet, ScrollView, Text, View} from "react-native";
import Notification from "../../components/Notification/Notifcation";

const Notifications = () => {
    return (
        <View  style={styles.container} >
            <View style={styles.header}>
                <Text style={styles.text}> Notifications </Text>
            </View>
            <View style={{flexDirection: 'row',alignItems: 'center'}} >
                <Text style={{color:"#d6d6d6",fontWeight: 'bold'}}> Derniers Notifications</Text>
                <View style={styles.line}/>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Notification/>
                <Notification/>
                <Notification/>
                <Notification/>
                <Notification/>
                <Notification/>
                <Notification/>
                <Notification/>
                <Notification/>
                <Notification/>
                <Notification/>
                <Notification/>
                <Notification/>
                <Notification/>
                <Notification/>
                <Notification/>
                <Notification/>
                <Notification/>
                <Notification/>
                <Notification/>
                <Notification/>
                <Notification/>
                <Notification/>
                <Notification/>
                <Notification/>
                <Notification/>
                <Notification/>
                <Notification/>
                <Notification/>
                <Notification/>
                <Notification/>
                <Notification/>
                <Notification/>
                <Notification/>
                <Notification/>
                <Notification/>
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container : {
        backgroundColor : 'white',
        flex : 1,
        paddingHorizontal : 0
    },
    header : {
        //backgroundColor : 'red',
        height : 50,
        width : '100%',
        marginTop: 50,
        paddingHorizontal : 10,
        alignSelf : 'center',
        alignItems : 'center',
        flexDirection : 'row',
        justifyContent : 'space-between',
    },
    text : {
        fontWeight : 'bold',
        fontSize : 20
    },
    line: {
        top : 3 ,
        borderBottomWidth : 1,
        borderColor: '#ddd',
        flex: 1,
        marginLeft : 5
    }
});
export default Notifications;
