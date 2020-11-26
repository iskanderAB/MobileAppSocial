import React, { useContext } from "react";
import { Text, View ,StyleSheet} from 'react-native';
import AuthContext from '../../components/Context/AuthContext'


const Others = ({navigation}) => {
    const { signOut } = useContext(AuthContext);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{fontWeight:'bold',fontSize:30,marginBottom :10}}> Others </Text>
            </View>
            <Text style={styles.text}>Evènements</Text>
            <Text style={styles.text} onPress={()=>navigation.navigate('Parametres')}>Paramétres</Text>
            <Text style={styles.text} onPress={()=>navigation.navigate('UpdatePost')}>Modifier status</Text>
            <Text
                style={styles.text}
                onPress={() => signOut()}
            >
                Se deconnecter
            </Text>

        </View>
    );
}
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
        fontSize: 16,
        marginTop : 10 ,
        marginLeft: 20,
        color : '#00A8FF'
    }
});
export default Others;
