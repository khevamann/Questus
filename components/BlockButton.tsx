import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { bungeeText } from '../util/styles';
import { color, layout, theme } from '../util/theme';

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
      style={[styles.container, style, disabled ? styles.disabled : null]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={bungeeText(25)}>{text}</Text>
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
  disabled: {
    opacity: theme.activeOpacity,
  },
});
