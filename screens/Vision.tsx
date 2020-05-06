import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Camera, CameraProps } from 'expo-camera';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
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
import { callGoogleVisionAsync } from '../providers/visionApi';
import { color, fonts, layout, safeAreaInsets, theme } from '../util/theme';
import { Feather } from '@expo/vector-icons';
import FocusGrid from '../components/FocusGrid';
import CircleButton from '../components/CircleButton';

type VisionProps = {
  route: RouteProp<StackParams, 'Vision'>;
  navigation: StackNavigationProp<StackParams, 'Vision'>;
  camera: Camera | null;
};

export default function Vision({ navigation, camera }: VisionProps) {
  const [image, setImage] = useState('');
  const [status, setStatus] = useState('');
  const [flash, setFlash] = useState<boolean>(false);
  const [hasPermission, setHasPermission] = useState(false);

  const takePictureAsync = async () => {
    setStatus('searching');
    if (!camera) return;
    const { uri, base64 } = await camera.takePictureAsync({
      base64: true,
    });
    if (base64) {
      setImage(uri);
      try {
        const result = await callGoogleVisionAsync(base64);
        console.log(result);
        setStatus('found');
        Alert.alert('Results', result);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const toggleFlash = () => {
    setFlash(!flash);
  };
  const exit = () => {
    navigation.goBack();
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      if (status != 'granted') {
        Alert.alert(
          'No Permission',
          'You must enable camera access in settings in order to find items.',
          [{ text: 'OK', onPress: () => exit() }]
        );
      }
    })();
  }, []);

  if (hasPermission === null || !hasPermission) {
    return <View />;
  }

  return (
    <>
      <StatusBar barStyle="light-content" translucent />
      <View style={styles.container}>
        <Camera
          style={styles.camera}
          ratio="4:3"
          flashMode={flash ? 'torch' : 'off'}
          ref={(ref) => (camera = ref)}
        >
          <View
            style={{
              ...styles.camLayover,
              paddingTop: safeAreaInsets.top,
              paddingBottom: safeAreaInsets.bottom,
            }}
          >
            <View style={styles.itemCont}>
              <Text style={styles.itemText}>Apple</Text>
            </View>
            <FocusGrid style={styles.focusGrid}></FocusGrid>
            <View style={styles.options}>
              <CircleButton
                small
                onPress={toggleFlash}
                style={{ backgroundColor: color.semi }}
              >
                {flash ? (
                  <Feather name="zap" size={33} color={color.white} />
                ) : (
                  <Feather name="zap-off" size={33} color={color.white} />
                )}
              </CircleButton>
              <CircleButton onPress={takePictureAsync}>
                <>
                  {status === 'searching' ? (
                    <ActivityIndicator size="large" color={color.white} />
                  ) : (
                    <Feather name="camera" size={32} color={color.white} />
                  )}
                </>
              </CircleButton>
              <CircleButton
                small
                onPress={exit}
                style={{ backgroundColor: color.semi }}
              >
                <Feather name="x" size={35} color={color.white} />
              </CircleButton>
            </View>
            {/*{image !== '' && (*/}
            {/*  <Image style={styles.image} source={{ uri: image }} />*/}
            {/*)}*/}
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
    width: layout.screenWidth,
    height: layout.fullHeight,
    alignItems: 'center',
    /*Re-Center content after camera has been shifted*/
    left: (layout.screenHeight * 0.7 - layout.screenWidth) / 2,
  },
  camera: {
    width: layout.screenHeight * 0.7,
    height: layout.fullHeight,
    /*Center camera*/
    right: (layout.screenHeight * 0.7 - layout.screenWidth) / 2,
  },
  itemCont: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.purple,
    borderRadius: 10,
    width: layout.screenWidth * 0.8,
    marginTop: 30,
    height: 50,
  },
  focusGrid: {
    flex: 1,
    width: layout.screenWidth,
  },
  options: {
    width: layout.screenWidth,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginBottom: 40,
    margin: 20,
  },
  itemText: {
    fontFamily: fonts.quicksand.bold,
    fontSize: 20,
    color: color.white,
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
