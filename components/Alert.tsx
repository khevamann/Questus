import { FontAwesome5 } from '@expo/vector-icons';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { hideAlert } from '../redux/actions/status';
import { RootState } from '../redux/reducers';
import { alertSelector, userSelector } from '../redux/selectors';
import { alertCloseAnimation, alertOpenAnimation } from '../util/animations';
import { SHADOW } from '../util/styles';
import { color, fonts, layout, theme } from '../util/theme';
import { AlertConfig, PlayerType } from '../util/types';
import BlockButton from './BlockButton';

export default function Alert() {
  const dispatch = useDispatch();
  const user = useSelector<RootState, PlayerType>(userSelector);
  const alert = useSelector<RootState, AlertConfig>(alertSelector);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [inputVal, setInputVal] = useState<string>('');

  const closeAlert = () => {
    alertCloseAnimation(animatedValue).start(() => {
      if (alert.onPress) alert.onPress(inputVal);
      dispatch(hideAlert());
      setInputVal('');
    });
  };

  const exitCancel = () => {
    alertCloseAnimation(animatedValue).start(() => {
      dispatch(hideAlert());
    });
  };

  useEffect(() => {
    if (!alert) return;
    alertOpenAnimation(animatedValue);
    if (alert.input === 'Nickname') setInputVal(user.name);
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
        <FontAwesome5
          style={styles.alertIcon}
          name={alert.icon || 'exclamation-triangle'}
          size={40}
          color={color.bleach}
        />
        {alert.title && (
          <Text style={styles.alertTitle}>{alert.title || ''}</Text>
        )}
        {alert.message && (
          <Text style={styles.alertMsg}>{alert.message || ''}</Text>
        )}
        {alert.input && (
          <TextInput
            style={styles.input}
            value={inputVal}
            onChangeText={setInputVal}
            maxLength={15}
            placeholder={alert.input}
          />
        )}
        <BlockButton
          style={styles.mainBtn}
          disabled={alert.input && (!inputVal || inputVal.length < 3)}
          text={alert.btnTxt || 'DISMISS'}
          onPress={closeAlert}
        />
        {alert.btnCancel && (
          <TouchableOpacity
            activeOpacity={theme.activeOpacity}
            onPress={exitCancel}
          >
            <Text style={styles.btnCancel}>{alert.btnCancel}</Text>
          </TouchableOpacity>
        )}
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
  btnCancel: {
    fontFamily: fonts.quicksand.medium,
    fontSize: 16,
    margin: 5,
    color: color.medium,
    textAlign: 'center',
  },
  input: {
    borderWidth: 2,
    width: '80%',
    borderRadius: 10,
    height: 50,
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
