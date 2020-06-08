import { FontAwesome5 } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Firebase from '../../providers/firebase';
import { userPopup } from '../../redux/actions/status';
import { setUser } from '../../redux/actions/user';
import { RootState } from '../../redux/reducers';
import { userSelector } from '../../redux/selectors';
import { addPlayer } from '../../util/animations';
import { color, fonts, theme } from '../../util/theme';
import { PlayerType } from '../../util/types';

type PlayerProp = {
  name: string;
  index: number;
  id: string;
};

const transforms = [
  { rotate: '-2deg' },
  { rotate: '1deg' },
  { rotate: '-3deg' },
  { rotate: '2deg' },
  { rotate: '-1deg' },
  { rotate: '3deg' },
];

const Player = ({ name, index, id }: PlayerProp) => {
  const dispatch = useDispatch();
  const animatedValue = useRef(new Animated.Value(0)).current;
  const user = useSelector<RootState, PlayerType>(userSelector);

  useEffect(() => {
    addPlayer(animatedValue);
  }, []);

  const setUserName = (name: string) => {
    if (!name || name.length < 3 || user.name === name) return;
    Firebase.changeName(name);
    dispatch(
      setUser({
        name,
        id: Constants.deviceId,
      })
    );
  };

  const editName = () => {
    dispatch(userPopup(setUserName));
  };

  return (
    <TouchableOpacity
      activeOpacity={theme.activeOpacity}
      disabled={user.id !== id}
      onPress={editName}
    >
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
        <Text style={styles.playerName}>
          {name + ' '}
          {user.id === id && (
            <FontAwesome5 name="pencil-alt" size={20} color={color.white} />
          )}
        </Text>
      </Animated.View>
    </TouchableOpacity>
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
