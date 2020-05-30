import { Animated, Easing } from 'react-native';

export const alertOpenAnimation = (animatedValue: Animated.AnimatedValue) => {
  Animated.timing(animatedValue, {
    toValue: 1,
    duration: 300,
    easing: Easing.linear,
    useNativeDriver: true,
  }).start();
};

export const alertCloseAnimation = (animatedValue: Animated.AnimatedValue) => {
  return Animated.timing(animatedValue, {
    toValue: 0,
    duration: 300,
    easing: Easing.linear,
    useNativeDriver: true,
  });
};

export const addPlayer = (animatedValue: Animated.AnimatedValue) => {
  return Animated.timing(animatedValue, {
    toValue: 1,
    duration: 300,
    easing: Easing.linear,
    useNativeDriver: true,
  }).start();
};

export const shakeAnimation = (animatedValue: Animated.AnimatedValue) => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1.0,
        duration: 30,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: -1.0,
        duration: 60,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 0.0,
        duration: 30,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]),
    { iterations: 3 }
  ).start();
};
