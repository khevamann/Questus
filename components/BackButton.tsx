import { Feather } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { color, fonts, theme } from '../util/theme';

type Props = {
  text: string;
  onPress(): void;
};

export default function BackButton({ text, onPress }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={theme.activeOpacity}
      style={styles.container}
      onPress={onPress}
    >
      <Feather name="arrow-left" size={30} color={color.danger} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderColor: color.danger,
    borderWidth: 2,
    width: 130,
    height: 45,
    borderRadius: 35,
    margin: 10,
  },
  text: {
    fontFamily: fonts.bungee,
    color: color.danger,
    fontSize: 20,
    padding: 0,
    lineHeight: 0,
    top: 2,
  },
});
