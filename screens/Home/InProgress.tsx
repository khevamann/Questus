import { Feather } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from '../../redux/reducers';
import { gameTypeSelector } from '../../redux/selectors';
import { SHADOW } from '../../util/styles';
import { color, fonts, layout, theme } from '../../util/theme';
import { GameModes } from '../../util/types';

type Props = {
  onQuit(): void;
  onContinue(): void;
  topInset: number;
};

export default function InProgress({ onQuit, onContinue, topInset }: Props) {
  const gameType = useSelector<RootState, number>(gameTypeSelector);
  const gameConfig = GameModes[`item${gameType}`];
  return (
    <TouchableOpacity
      activeOpacity={theme.activeOpacity}
      onPress={onContinue}
      style={{
        ...styles.container,
        backgroundColor: gameConfig.primaryColor,
        marginTop: topInset,
      }}
    >
      <View
        style={{
          ...styles.colorCircle,
          backgroundColor: gameConfig.secondaryColor,
        }}
      />
      <Text style={styles.text}>GAME IN PROGRESS</Text>
      <TouchableOpacity activeOpacity={theme.activeOpacity} onPress={onQuit}>
        <Feather name="x" size={30} color={color.white} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    ...SHADOW,
    position: 'absolute',
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: layout.screenWidth * 0.8,
    padding: 5,
    borderRadius: 30,
  },
  text: {
    fontFamily: fonts.quicksand.bold,
    textTransform: 'uppercase',
    color: color.white,
    fontSize: 20,
    marginLeft: 10,
  },
  colorCircle: {
    width: 40,
    height: 40,
    position: 'absolute',
    borderRadius: 20,
    right: 0,
  },
});
