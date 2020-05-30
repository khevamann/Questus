import { FontAwesome5 } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { bungeeText } from '../util/styles';
import { color, theme } from '../util/theme';

type Props = {
  onPress(): void;
};

export default function BackButton({ onPress }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={theme.activeOpacity}
      style={styles.container}
      onPress={onPress}
    >
      <FontAwesome5
        style={styles.icon}
        name="angle-left"
        size={30}
        color={color.white}
      />
      <Text style={bungeeText(20)}>Back</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderColor: color.white,
    borderWidth: 2,
    width: 130,
    height: 45,
    borderRadius: 35,
    margin: 10,
  },
  icon: {
    marginTop: 4,
    marginRight: 5,
  },
});
