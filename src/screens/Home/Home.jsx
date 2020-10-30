import React from 'react';
import {StyleSheet,ScrollView,Text,View} from "react-native";
import Post from "../../components/Card/Post";
import { MaterialIcons } from '@expo/vector-icons';
import {Avatar} from "react-native-paper";





const Home = () => {
    return (
        <View  style={styles.container} >
            <View style={styles.header}>
                <Text style={styles.text}> Accueil </Text>
                <MaterialIcons name="notifications-none" size={30} color="black" />
            </View>
            <View style={{flexDirection: 'row',alignItems: 'center'}} >
                <Text style={{color:"#d6d6d6",fontWeight: 'bold'}}> Derniers statuts </Text><View style={styles.line}></View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
            </ScrollView>
        </View>

        ) ;

}

const styles = StyleSheet.create({
    container : {
        backgroundColor : 'white',
        flex : 1,
        paddingHorizontal : 20
    },
    header : {
        //backgroundColor : 'red',
        height : 50,
        width : '100%',
        marginTop: 50,
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
export default Home;
