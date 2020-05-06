import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { StackParams } from '../App';
import BlockButton from '../components/BlockButton';
import GameHeader from '../components/GameHeader';
import DataService from '../providers/dataservice';
import { setGameCode } from '../redux/actions/gameAction';
import { RootState } from '../redux/reducers';
import {
  codeSelector,
  gameTypeSelector,
  playersSelector,
} from '../redux/selectors';
import { generateGameCode } from '../util/helpers';
import { AVATAR_LARGE, HEADER_TEXT } from '../util/styles';
import { color, fonts, safeAreaInsets } from '../util/theme';
import { PlayerType } from '../util/types';

type CreateGameProps = {
  navigation: StackNavigationProp<StackParams, 'CreateGame'>;
};

const Player = ({ name, avatar }: PlayerType) => {
  return (
    <View style={styles.player}>
      <Image style={AVATAR_LARGE} source={{ uri: avatar }} />
      <Text style={styles.playerName}>{name}</Text>
    </View>
  );
};

export default function CreateGame({ navigation }: CreateGameProps) {
  const dispatch = useDispatch();
  const players = useSelector<RootState, PlayerType[]>(playersSelector);
  const gameType = useSelector<RootState, number>(gameTypeSelector);
  const gameCode = useSelector<RootState, string>(codeSelector);

  useEffect(() => {
    if (gameCode) {
      //Join Game
    } else {
      const newCode = generateGameCode(gameType);
      DataService.createGame(newCode).then((newCode: string) => {
        dispatch(setGameCode(newCode));
      });
    }
  }, []);

  const goBack = () => {
    dispatch(setGameCode(''));
    navigation.goBack();
  };
  const goGame = () => {
    navigation.navigate('PlayGame');
  };

  return (
    <View style={styles.container}>
      <GameHeader backText="EXIT" onBack={goBack} />
      <Text style={HEADER_TEXT}>PLAYERS (2-8)</Text>
      <View style={styles.outerPlayers}>
        <View style={styles.players}>
          {players.map((player: PlayerType) => (
            <Player
              key={player.name}
              name={player.name}
              avatar={player.avatar}
            />
          ))}
        </View>
      </View>
      <BlockButton
        style={{ marginBottom: safeAreaInsets.bottom || 20 }}
        text={players.length < 2 ? 'WAITING . . .' : 'START GAME'}
        disabled={players.length < 2}
        onPress={goGame}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  outerPlayers: {
    flex: 1,
    justifyContent: 'center',
  },
  players: {
    marginHorizontal: 30,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
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
