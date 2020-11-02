import React from 'react' ;
import {StyleSheet, ScrollView, Text, View} from "react-native";
import {Avatar} from "react-native-paper";
import Post from "../../components/Card/Post";

const Profile = () =>
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.text}> Profile </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} >
            <Avatar.Image size={150} style={styles.image}
                          source={{uri: 'https://pyxis.nymag.com/v1/imgs/7ad/fa0/4eb41a9408fb016d6eed17b1ffd1c4d515-07-jon-snow.rsquare.w330.jpg'}}/>
            <Text style={styles.textName}> Foulen el Foulani </Text>
            <Text style={styles.textProfileType}> Etudiant</Text>
            <Text style={styles.textClass}> DSI </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color: "#d6d6d6", fontWeight: 'bold'}}> Mes Derniers statuts </Text><View
                style={styles.line}></View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} invertStickyHeaders={true}>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
            </ScrollView>
        </ScrollView>
    </View>;
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        paddingHorizontal: 0
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
    text: {
        fontWeight: 'bold',
        fontSize: 20
    },
    line: {
        top: 3,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        flex: 1,
        marginLeft: 5
    },
    image: {
        alignSelf: 'center'
    },
    textName: {
        fontWeight: 'bold',
        fontSize: 22,
        alignSelf: 'center'
    },
    textProfileType: {
        fontSize: 20,
        color: '#87ceeb',
        alignSelf: 'center'
    },
    textClass: {
        fontSize: 18,
        alignSelf: 'center'
    }
});
export default Profile;
