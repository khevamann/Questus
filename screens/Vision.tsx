import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Camera, CameraProps } from 'expo-camera';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { StackParams } from '../App';
import { callGoogleVisionAsync } from '../util/visionApi';
import { color, layout, theme } from '../util/theme';
import { Feather } from '@expo/vector-icons';

type VisionProps = {
  route: RouteProp<StackParams, 'Vision'>;
  navigation: StackNavigationProp<StackParams, 'Vision'>;
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
    <>
      <StatusBar barStyle="light-content" translucent />
      <View style={styles.container}>
        <Camera style={styles.camera} ratio="4:3" ref={(ref) => (camera = ref)}>
          <View style={styles.camLayover}>
            <TouchableOpacity
              activeOpacity={theme.activeOpacity}
              style={styles.takePicBtn}
              onPress={takePictureAsync}
            >
              <Feather name="camera" size={32} color="white" />
            </TouchableOpacity>
            {status !== '' && <Text style={styles.text}>{status}</Text>}
            {image !== '' && (
              <Image style={styles.image} source={{ uri: image }} />
            )}
          </View>
        </Camera>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camLayover: {
    borderWidth: 3,
    borderColor: 'red',
    borderRadius: 40,
    width: layout.screenWidth,
    height: layout.fullHeight,
    /*Re-Center content after camera has been shifted*/
    left: (layout.screenHeight * 0.7 - layout.screenWidth) / 2,
  },
  camera: {
    width: layout.screenHeight * 0.7,
    height: layout.fullHeight,
    /*Center camera*/
    right: (layout.screenHeight * 0.7 - layout.screenWidth) / 2,
  },
  takePicBtn: {
    margin: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.purple,
    borderWidth: 3,
    borderColor: color.light,
    width: 75,
    height: 75,
    borderRadius: 40,
  },
  image: {
    borderWidth: 3,
    margin: 10,
    width: 300,
    height: 300 * 1.33,
  },
  text: {
    margin: 5,
    color: color.white,
  },
});
