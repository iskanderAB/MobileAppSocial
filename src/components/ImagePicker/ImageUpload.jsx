import React, { useState, useEffect } from 'react';
import { Text, Image, View, Platform ,StyleSheet} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

const  ImageUpload = () =>  {
  const [image, setImage] = useState(null);

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
    });
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };


  return (
    <View style={{...styles.container,height : 200,}} onPress={()=> console.log("pressed ! ")}>
      <Text>Choisir un Image</Text>
      {image && <Image source={{ uri: image }} style={{ width: '90%', height: 200 , alignItems:"center" , justifyContent :'center' }} />}
    </View>
  );
}
const styles = StyleSheet.create({
    container : {
        width : '100%',
        backgroundColor : 'red'
    }
});
export default ImageUpload ; 
