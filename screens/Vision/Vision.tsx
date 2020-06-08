import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Camera } from 'expo-camera';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { StackParams } from '../../App';
import CircleButton from '../../components/CircleButton';
import Firebase from '../../providers/firebase';
import { callGoogleVisionAsync, isItemMatch } from '../../providers/visionApi';
import { setItemComplete } from '../../redux/actions/game';
import { RootState } from '../../redux/reducers';
import { gameOverSelector, isWinnerSelector } from '../../redux/selectors';
import { shakeAnimation } from '../../util/animations';
import { FA_ICON } from '../../util/styles';
import { color, fonts, layout, safeAreaInsets } from '../../util/theme';
import FocusGrid from './FocusGrid';

type VisionProps = {
  route: RouteProp<StackParams, 'Vision'>;
  navigation: StackNavigationProp<StackParams, 'Vision'>;
  camera: Camera | null;
};

export default function Vision({ navigation, camera, route }: VisionProps) {
  const dispatch = useDispatch();
  const gameOver = useSelector<RootState, string>(gameOverSelector);
  const [status, setStatus] = useState('');
  const [flash, setFlash] = useState<boolean>(false);
  const [hasPermission, setHasPermission] = useState(false);
  const { itemIndex, item } = route.params;
  const animatedValue = useRef(new Animated.Value(0)).current;
  const isWinner = useSelector<RootState, boolean>(isWinnerSelector);

  useEffect(() => {
    if (!gameOver || isWinner) return;
    exit();
  }, [gameOver]);

  const noMatch = () => {
    shakeAnimation(animatedValue);
    setStatus('');
  };

  const takePictureAsync = async () => {
    setStatus('searching');
    if (!camera) return;
    const { base64 } = await camera.takePictureAsync({
      base64: true,
    });
    if (base64) {
      try {
        const results = await callGoogleVisionAsync(base64);
        if (!results) return noMatch();
        //console.log(results);
        if (!isItemMatch(results, item)) return noMatch();

        setStatus('found');
        Firebase.incrementScore();
        dispatch(setItemComplete(itemIndex));
        exit();
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
      if (status !== 'granted') {
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
            <Animated.View
              style={{
                ...styles.itemCont,
                transform: [
                  {
                    rotate: animatedValue.interpolate({
                      inputRange: [-1, 1],
                      outputRange: ['-3deg', '3deg'],
                    }),
                  },
                ],
              }}
            >
              <Text style={styles.itemText}>{item.name}</Text>
            </Animated.View>
            <FocusGrid style={styles.focusGrid} />
            <View style={styles.options}>
              <CircleButton
                small
                onPress={toggleFlash}
                style={{ backgroundColor: color.semi }}
              >
                {flash ? (
                  <Feather name="zap" size={34} color={color.white} />
                ) : (
                  <Feather name="zap-off" size={34} color={color.white} />
                )}
              </CircleButton>
              <CircleButton disabled={status !== ''} onPress={takePictureAsync}>
                <>
                  {status === 'searching' ? (
                    <ActivityIndicator size="large" color={color.white} />
                  ) : (
                    <FontAwesome5
                      style={FA_ICON}
                      name="camera"
                      size={35}
                      color={color.white}
                    />
                  )}
                </>
              </CircleButton>
              <CircleButton
                small
                onPress={exit}
                style={{ backgroundColor: color.semi }}
              >
                <FontAwesome5
                  style={FA_ICON}
                  name="times"
                  size={35}
                  color={color.white}
                />
              </CircleButton>
            </View>
          </View>
        </Camera>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
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
  text: {
    margin: 5,
    color: color.white,
  },
});
