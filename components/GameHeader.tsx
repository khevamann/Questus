import * as React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';

import { color, fonts, layout } from '../util/theme';
import { GameConfig } from '../util/types';
import BackButton from './BackButton';

type Props = {
  options: GameConfig;
  gameCode: string;
  backText: string;
  onBack(): void;
};

export default function GameHeader({
  backText,
  onBack,
  gameCode,
  options: { primaryColor, secondaryColor },
}: Props) {
  const insets = useSafeArea();

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View
        style={{
          ...styles.container,
          backgroundColor: primaryColor,
          paddingTop: insets.top,
        }}
      >
        <BackButton text={backText} onPress={onBack} />
        <View
          style={{
            ...styles.colorCircle,
            backgroundColor: secondaryColor,
          }}
        />
        <View style={styles.codeCont}>
          <Text style={styles.codeTitle}>GAME CODE</Text>
          <Text style={styles.gameCode}>{gameCode}</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: layout.screenWidth,
    overflow: 'hidden',
    padding: 5,
  },
  codeCont: {
    marginHorizontal: 20,
  },
  codeTitle: {
    fontFamily: fonts.quicksand.bold,
    textTransform: 'uppercase',
    color: color.white,
    fontSize: 20,
  },
  gameCode: {
    fontFamily: fonts.bungee,
    color: color.white,
    fontSize: 40,
  },
  colorCircle: {
    width: 200,
    height: 200,
    position: 'absolute',
    borderRadius: 100,
    top: -30,
    right: -30,
  },
});
