import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { useEffect } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { StackParams } from '../../App';
import BlockButton from '../../components/BlockButton';
import GameHeader from '../../components/GameHeader';
import { clearGame, createGame } from '../../redux/actions/game';
import { setGameStatus } from '../../redux/actions/status';
import { RootState } from '../../redux/reducers';
import { errors } from '../../redux/reducers/status';
import {
  codeSelector,
  gameStatus,
  gameTypeSelector,
  isHostSelector,
  playersSelector,
} from '../../redux/selectors';
import { HEADER_TEXT } from '../../util/styles';
import { safeAreaInsets } from '../../util/theme';
import { GameStatus, PlayerType } from '../../util/types';
import Player from './Player';

type CreateGameProps = {
  navigation: StackNavigationProp<StackParams, 'CreateGame'>;
};

export default function CreateGame({ navigation }: CreateGameProps) {
  const dispatch = useDispatch();
  const players = useSelector<RootState, PlayerType[]>(playersSelector);
  const status = useSelector<RootState, GameStatus>(gameStatus);
  const isHost = useSelector<RootState, boolean>(isHostSelector);
  const gameType = useSelector<RootState, number>(gameTypeSelector);
  const gameCode = useSelector<RootState, string>(codeSelector);

  useEffect(() => {
    if (gameType === 0) navigation.goBack();
    if (!gameCode) dispatch(createGame(gameType));
  }, []);

  useEffect(() => {
    if (status === GameStatus.LOBBY) return;
    if (status === GameStatus.PLAYING) {
      navigation.navigate('PlayGame');
    } else {
      dispatch(clearGame());
      Alert.alert(errors['GAME_DELETED'].title, errors['GAME_DELETED'].message);
      goBack();
    }
    dispatch(setGameStatus(GameStatus.LOBBY));
  }, [status]);

  const goBack = () => {
    navigation.goBack();
  };
  const goGame = () => {
    dispatch(setGameStatus(GameStatus.PLAYING));
  };

  return (
    <View style={styles.container}>
      <GameHeader onBack={goBack} />
      <Text style={HEADER_TEXT}>PLAYERS (2-8)</Text>
      <View style={styles.outerPlayers}>
        <View style={styles.players}>
          {players.map((player: PlayerType) => (
            <Player key={player.id} name={player.name} avatar={player.avatar} />
          ))}
        </View>
      </View>
      <BlockButton
        style={{ marginBottom: safeAreaInsets.bottom || 20 }}
        text={
          players.length < 2
            ? 'WAITING . . .'
            : isHost
            ? 'START GAME'
            : 'ASK HOST TO START'
        }
        /*{FIXME SHOULD BE 2 not 0}*/
        disabled={!isHost || players.length < 0}
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
});
