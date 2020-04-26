import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { color, fonts, theme } from '../util/theme';
import { GameConfig } from '../util/types';

type Props = {
  onPress(gameMode: GameConfig): void;
};

type BtnProps = {
  onPress(config: GameConfig): void;
  options: GameConfig;
};

const MaskedBtn = ({ onPress, options }: BtnProps) => {
  return (
    <TouchableOpacity
      activeOpacity={theme.activeOpacity}
      style={{ ...styles.maskedBtn, backgroundColor: options.primaryColor }}
      onPress={() => onPress(options)}
    >
      <View
        style={{
          ...styles.colorCircle,
          backgroundColor: options.secondaryColor,
        }}
      />
      <Text style={styles.text}>{options.gameId} items</Text>
    </TouchableOpacity>
  );
};

export default function CreateGameGrid({ onPress }: Props) {
  const gameBtns: GameConfig[] = [
    {
      gameId: '3',
      primaryColor: color.home.green,
      secondaryColor: color.home.red,
    },
    {
      gameId: '6',
      primaryColor: color.home.purple,
      secondaryColor: color.home.orange,
    },
    {
      gameId: '9',
      primaryColor: color.home.orange,
      secondaryColor: color.home.purple,
    },
    {
      gameId: '12',
      primaryColor: color.home.red,
      secondaryColor: color.home.green,
    },
  ];

  return (
    <View style={styles.container}>
      {gameBtns.map((btnOpts) => (
        <MaskedBtn key={btnOpts.gameId} onPress={onPress} options={btnOpts} />
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
