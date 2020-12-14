import React, { useState, useEffect } from 'react';
import { Text, Image, View, Platform, StyleSheet, TouchableHighlight } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

const ImageUpload = ({setImage,image}) => {
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64:true,
    });
    //console.log(result);

    if (!result.cancelled) {
      setImage(result);
      //console.log('[imageUpload]' , typeof result.base64)
    }
  };

  return (
    <TouchableHighlight onPress={() => pickImage()} underlayColor="white">
      <View style={{ ...styles.container, height: 150}}>
      {image === null ? <Text style={styles.text}>Choisir un Image</Text> :<Image source={{ uri: image.uri }} style={{ width: '100%', height: '100%', alignItems: "center", justifyContent: 'center', borderRadius: 6}} /> }
      </View>
    </TouchableHighlight>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: '#f2f2f2',
    borderRadius: 6,
    marginBottom : 10,
    alignSelf :'center',
    alignItems:'center',
    flexDirection : 'row',
    alignContent : "center",
    justifyContent :'center'
  },
  text :{
    color : 'gray',
    fontWeight : 'bold',
    fontSize : 20
  }
});
export default ImageUpload; 
