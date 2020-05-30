import * as React from 'react';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

import { addPlayer } from '../../util/animations';
import { color, fonts } from '../../util/theme';

type PlayerProp = {
  name: string;
  index: number;
};

const transforms = [
  { rotate: '-2deg' },
  { rotate: '1deg' },
  { rotate: '-3deg' },
  { rotate: '2deg' },
  { rotate: '-1deg' },
  { rotate: '3deg' },
];

const Player = ({ name, index }: PlayerProp) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    addPlayer(animatedValue);
  }, []);

  return (
    <Animated.View
      shouldRasterizeIOS
      style={{
        ...styles.player,
        transform: [
          transforms[index % 6],
          {
            scale: animatedValue.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0.5, 1.2, 1],
            }),
          },
        ],
        backgroundColor: color.items[index % 4],
      }}
    >
      <Text style={styles.playerName}>{name}</Text>
    </Animated.View>
  );
};

export default Player;

const styles = StyleSheet.create({
  player: {
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginHorizontal: 10,
    marginVertical: 15,
  },
  playerName: {
    fontFamily: fonts.quicksand.bold,
    fontSize: 25,
    color: color.white,
  },
});
