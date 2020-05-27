import { Feather } from '@expo/vector-icons';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { hideAlert } from '../redux/actions/status';
import { RootState } from '../redux/reducers';
import { alertSelector } from '../redux/selectors';
import { alertCloseAnimation, alertOpenAnimation } from '../util/animations';
import { SHADOW } from '../util/styles';
import { color, fonts, layout } from '../util/theme';
import { AlertConfig } from '../util/types';
import BlockButton from './BlockButton';

export default function Alert() {
  const dispatch = useDispatch();
  const alert = useSelector<RootState, AlertConfig>(alertSelector);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const closeAlert = () => {
    alertCloseAnimation(animatedValue).start(() => {
      if (alert.onPress) alert.onPress();
      dispatch(hideAlert());
    });
  };

  useEffect(() => {
    if (alert) alertOpenAnimation(animatedValue);
  }, [alert]);

  if (!alert) return null;
  return (
    <View style={styles.backdrop}>
      <Animated.View
        style={{
          ...styles.container,
          opacity: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
          transform: [
            {
              scale: animatedValue.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0.5, 1.2, 1],
              }),
            },
          ],
        }}
      >
        <Feather
          style={styles.alertIcon}
          name={alert.icon || 'alert-octagon'}
          size={40}
          color={color.bleach}
        />
        <Text style={styles.alertTitle}>{alert.title || ''}</Text>
        <Text style={styles.alertMsg}>{alert.message || ''}</Text>
        <BlockButton
          style={styles.mainBtn}
          text={alert.btnTxt || 'DISMISS'}
          onPress={closeAlert}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    zIndex: 10,
    width: layout.screenWidth,
    height: layout.fullHeight,
    backgroundColor: color.semi,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    ...SHADOW,
    marginTop: -150,
    backgroundColor: color.white,
    width: layout.screenWidth * 0.75,
    maxWidth: 300,
    borderRadius: 20,
    alignItems: 'center',
    padding: 10,
  },
  alertIcon: {
    marginTop: 20,
    marginBottom: 10,
  },
  alertTitle: {
    fontFamily: fonts.quicksand.bold,
    fontSize: 18,
    margin: 10,
    color: color.dark,
  },
  alertMsg: {
    fontFamily: fonts.quicksand.medium,
    margin: 10,
    color: color.medium,
    textAlign: 'center',
  },
  mainBtn: {
    width: '90%',
    height: 50,
    marginTop: 20,
    marginBottom: 5,
    borderRadius: 50,
  },
});
