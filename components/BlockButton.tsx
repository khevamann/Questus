import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { color, fonts, layout, theme } from '../util/theme';

type Props = {
  style?: any;
  text: string;
  onPress(): void;
  disabled?: boolean;
};

export default function BlockButton({ style, text, onPress, disabled }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={theme.activeOpacity}
      style={[style, styles.container, disabled ? styles.disabled : null]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: color.purple,
    width: layout.screenWidth * 0.8,
    height: 80,
    borderRadius: 20,
  },
  text: {
    fontFamily: fonts.bungee,
    color: color.white,
    fontSize: 25,
    marginBottom: -5,
  },
  disabled: {
    opacity: 0.7,
  },
});
