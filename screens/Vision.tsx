import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Camera, CameraProps } from 'expo-camera';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { RootStackParamList } from '../App';
import { callGoogleVisionAsync } from '../util/visionApi';
import { color, layout } from '../util/theme';
import { Feather } from '@expo/vector-icons';

type VisionProps = {
  route: RouteProp<RootStackParamList, 'Vision'>;
  navigation: StackNavigationProp<RootStackParamList, 'Vision'>;
  camera: Camera | null;
};

export default function Vision({ navigation, camera }: VisionProps) {
  const [image, setImage] = React.useState('');
  const [status, setStatus] = useState<string>('');
  const takePictureAsync = async () => {
    if (!camera) return;
    const { uri, base64 } = await camera.takePictureAsync({
      base64: true,
    });
    if (base64) {
      setStatus('Loading...');
      setImage(uri);
      try {
        const result = await callGoogleVisionAsync(base64);
        setStatus(result);
        console.log(result);
      } catch (error) {
        console.log(error);
        setStatus(`Error: ${error.message}`);
      }
    }
  };

  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (!hasPermission) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.camContainer}>
        <Camera
          style={styles.camera}
          ratio="4:3"
          ref={(ref) => (camera = ref)}
        ></Camera>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.takePicBtn}
          onPress={takePictureAsync}
        >
          <Feather name="camera" size={32} color="white" />
        </TouchableOpacity>
        {/*        {image !== '' && <Image style={styles.image} source={{ uri: image }} />}*/}
        {status !== '' && <Text style={styles.text}>{status}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  camContainer: {
    flex: 2,
  },
  camera: {
    width: layout.screenWidth,
    height: layout.screenWidth * 1.33,
  },
  takePicBtn: {
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.blue,
    borderWidth: 3,
    borderColor: color.light,
    width: 75,
    height: 75,
    borderRadius: 40,
  },
  image: {
    width: 300,
    height: 300,
  },
  text: {
    margin: 5,
  },
});
