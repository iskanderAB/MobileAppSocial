import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    CheckBox,
    TouchableOpacity,
    Picker,
    RefreshControl,
    Pressable,
    Alert
} from "react-native";
import moment from 'moment';
import { Button } from 'react-native-paper';
import Axios from 'axios';
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import ImageUpload from "../../components/ImagePicker/ImageUpload";
import { Fontisto } from '@expo/vector-icons';
const UpdatePost = ({ route , navigation}) => {
    const { UpdateImage, updateTitle, updateContent, updateDate, updateType,id ,token } = route.params;
    const [isSelected, setSelection] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(updateContent);
    const [nomEven, setNomEven] = useState(updateTitle);
    const [date, setDate] = useState(moment(updateDate).format('ll'));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [image, setImage] = useState(null);
    let ip = '192.168.43.207';

    const onChange = (event, selectedDate) => {
        // const currentDate = selectedDate || date;
        setShow(Platform.OS === 'Android');
        setDate(moment(selectedDate).format('ll'));
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };
    const update = async () => { 
        let data = updateType === 'event' ? {
            date : date ,
            content :  status,
            title : nomEven

        } :
        {
            content :  status,
        }
        await Axios.put(`http://${ip}:8001/api/post/${id}`, data , {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            // handle success
            console.log("Response =====> ", response.data);
            alert(" success ");
            navigation.navigate('HomePage');
        }).catch(error => {
            console.log('====================================');
            console.log(error.response);
            console.log('====================================');
            alert(`${error}`);
        });
    }
    const deleteRequest = async () => { 
        await Axios.delete(`http://${ip}:8001/api/post/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            // handle success
            console.log("Response =====> ", response.data);
            alert(" deleted ")
            navigation.navigate('HomePage');
        }).catch(error => {
            console.log('====================================');
            console.log(error.response);
            console.log('====================================');
            alert(`${error}`);
        });
        
        
    }

    const ifEvent = () => {
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.text}> Nom de l'Evènement </Text>
                <TextInput placeholder={'Nom de l\'Evènement'} style={{
                    height: 50,
                    width: '100%',
                    borderWidth: 1,
                    padding: 15,
                    borderColor: '#bebcbc',
                    marginBottom: 5,
                    borderRadius: 50,
                }} selectionColor={'red'}
                    onChangeText={(text) => setNomEven(text)}
                />

                <Text style={styles.text}> Date de l'Evènement </Text>

                <View>
                    <TouchableOpacity style={styles.dateBut} onPress={showDatepicker}>
                        <Text style={{ fontWeight: "700", color: '#606060' }}>{date}</Text>
                        <Fontisto name="date" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.text}> </Text>
                </View>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}
            </View>
        )
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            {/* <View style={styles.header}>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                }}> Modifier status </Text>
            </View> */}

            <View style={styles.container1}>
                <View style={styles.inputContainer} >
                    <TextInput
                        style={{ textAlignVertical: 'top' }}
                        value={status}
                        placeholderTextColor="grey"
                        numberOfLines={10}
                        multiline={true}
                        onChangeText={(text) => setStatus(text)}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{
                        marginVertical: 10,
                        color: '#606060',
                        fontWeight: '700'
                    }}> Evènement </Text>

                </View>

                {
                    updateType === "event" ?
                        <View style={{ flex: 1 }}>
                            <Text style={styles.text}> Nom de l'Evènement </Text>
                            <TextInput style={{
                                height: 50,
                                width: '100%',
                                borderWidth: 1,
                                padding: 15,
                                borderColor: '#bebcbc',
                                marginBottom: 5,
                                borderRadius: 50,
                            }} selectionColor={'red'}
                                onChangeText={(text) => setNomEven(text)}
                                value={nomEven}
                            />
                            <Text style={styles.text}> Date de l'Evènement </Text>

                            <View>
                                <TouchableOpacity style={styles.dateBut} onPress={showDatepicker}>
                                    <Text style={{ fontWeight: "700", color: '#606060' }}>{date}</Text>
                                    <Fontisto name="date" size={24} color="black" />
                                </TouchableOpacity>
                                <Text style={styles.text}> </Text>
                            </View>
                            {show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={new Date(date)}
                                    mode={mode}
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChange}
                                />
                            )}
                        </View>
                        :
                        null
                }
                <Button
                    title="Left button"
                    onPress={() => 0}
                    mode="contained"
                    color='#50aeff'
                    loading={loading}
                    style={styles.button}
                    labelStyle={styles.label}
                    contentStyle={{ height: 60 }}
                    onPress={() => update()}
                > Confirmer </Button>
                <Button
                    title="Left button"
                    onPress={deleteRequest}
                    mode="contained"
                    color='#dc3545'
                    loading={loading}
                    style={styles.button}
                    labelStyle={styles.label}
                    contentStyle={{ height: 60 }}
                > Supprimer la status </Button>
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
    header: {
        //backgroundColor : 'red',
        height: 50,
        width: '100%',
        marginTop: 10,
        paddingHorizontal: 10,
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputContainer: {
        height: 150,
        width: '100%',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: '#bebcbc',
        marginVertical: 10,

    },
    dateBut: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        padding: 15,
        borderColor: '#bebcbc',
        borderWidth: 1,
        marginBottom: 5,
        borderRadius: 50,
    },
    input: {
        height: 400,
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
        marginBottom: 20,
    },
    label: {
        color: 'white'
    },
    textBottom: {
        flex: 1,
        justifyContent: 'center'
    }
});
export default UpdatePost;