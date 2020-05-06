import * as React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from '../redux/reducers';
import { codeSelector, gameTypeSelector } from '../redux/selectors';
import { color, fonts, layout, safeAreaInsets } from '../util/theme';
import { GameModes } from '../util/types';
import BackButton from './BackButton';

type Props = {
  backText: string;
  onBack(): void;
};

export default function GameHeader({ backText, onBack }: Props) {
  const gameType = useSelector<RootState, number>(gameTypeSelector);
  const gameCode = useSelector<RootState, string>(codeSelector);
  const gameConfig = GameModes[`item${gameType}`];
  return (
    <>
      <StatusBar barStyle="light-content" />
      <View
        style={{
          ...styles.container,
          backgroundColor: gameConfig.primaryColor,
          paddingTop: safeAreaInsets.top,
        }}
      >
        <BackButton text={backText} onPress={onBack} />
        <View
          style={{
            ...styles.colorCircle,
            backgroundColor: gameConfig.secondaryColor,
          }}
        />
        <View style={styles.codeCont}>
          <Text style={styles.codeTitle}>GAME CODE</Text>
          <Text style={styles.gameCode}>{gameCode || 'QQQQ'}</Text>
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
    lineHeight: 40,
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
