import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { color, fonts, theme } from '../util/theme';
import { GameConfig, GameModes } from '../util/types';

type Props = {
  onPress(gameType: number): void;
};

type BtnProps = {
  onPress(gameType: number): void;
  options: GameConfig;
};

const MaskedBtn = ({ onPress, options }: BtnProps) => {
  return (
    <TouchableOpacity
      activeOpacity={theme.activeOpacity}
      style={{ ...styles.maskedBtn, backgroundColor: options.primaryColor }}
      onPress={() => onPress(options.itemCount)}
    >
      <View
        style={{
          ...styles.colorCircle,
          backgroundColor: options.secondaryColor,
        }}
      />
      <Text style={styles.text}>{options.itemCount} items</Text>
    </TouchableOpacity>
  );
};

export default function CreateGameGrid({ onPress }: Props) {
  return (
    <View style={styles.container}>
      {Object.keys(GameModes).map((key: string) => (
        <MaskedBtn key={key} onPress={onPress} options={GameModes[key]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  maskedBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.purple,
    flexBasis: '40%',
    margin: 10,
    height: 100,
    borderRadius: 30,
    overflow: 'hidden',
  },
  text: {
    fontFamily: fonts.bungee,
    color: color.white,
    fontSize: 20,
    top: 35,
  },
  colorCircle: {
    width: 100,
    height: 100,
    position: 'absolute',
    borderRadius: 50,
    top: -40,
    right: -40,
  },
});
