import * as React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from '../../redux/reducers';
import { gameConfigSelector } from '../../redux/selectors';
import { bungeeText } from '../../util/styles';
import { color, layout, safeAreaInsets } from '../../util/theme';
import { GameConfig } from '../../util/types';

type Props = {
  startTime: number;
};

export default function StartOverlay({ startTime }: Props) {
  const gameConfig = useSelector<RootState, GameConfig>(gameConfigSelector);
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
        <View
          style={{
            ...styles.colorCircle,
            backgroundColor: gameConfig.secondaryColor,
          }}
        >
          <Text style={styles.startTime}>{startTime >= 0 ? startTime : 3}</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: layout.screenWidth,
    height: layout.fullHeight,
  },
  startTime: {
    ...bungeeText(120),
    color: color.white,
  },
  colorCircle: {
    width: 200,
    height: 200,
    marginTop: -50,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
