import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { color, theme } from '../util/theme';

type Props = {
  style?: any;
  small?: boolean;
  onPress(): void;
  children: JSX.Element;
};

export default function CircleButton({
  style,
  small,
  onPress,
  children,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={theme.activeOpacity}
      style={[styles.takePicBtn, style, small ? styles.smallBtn : null]}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  takePicBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.purple,
    borderWidth: 5,
    borderColor: color.white,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  smallBtn: {
    width: 50,
    height: 50,
    borderWidth: 2,
  },
});
