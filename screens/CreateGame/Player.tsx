import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { AVATAR_LARGE } from '../../util/styles';
import { color, fonts } from '../../util/theme';
import { PlayerType } from '../../util/types';

const Player = ({ name, avatar }: PlayerType) => {
  return (
    <View style={styles.player}>
      <Image style={AVATAR_LARGE} source={{ uri: avatar }} />
      <Text style={styles.playerName}>{name}</Text>
    </View>
  );
};

export default Player;

const styles = StyleSheet.create({
  player: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: '40%',
    alignItems: 'center',
  },
  playerName: {
    fontFamily: fonts.quicksand.bold,
    fontSize: 12,
    color: color.dark,
  },
});
