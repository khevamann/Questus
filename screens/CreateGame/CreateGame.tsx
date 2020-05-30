import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { StackParams } from '../../App';
import BlockButton from '../../components/BlockButton';
import GameHeader from '../../components/GameHeader';
import Firebase from '../../providers/firebase';
import { clearGame, createGame } from '../../redux/actions/game';
import { displayAlert, setGameStatus } from '../../redux/actions/status';
import { RootState } from '../../redux/reducers';
import {
  codeSelector,
  gameStatus,
  gameTypeSelector,
  isHostSelector,
  playersSelector,
  startSelector,
} from '../../redux/selectors';
import { HEADER_TEXT } from '../../util/styles';
import { safeAreaInsets } from '../../util/theme';
import { GameStatus, PlayerType } from '../../util/types';
import Player from './Player';
import StartOverlay from './StartOverlay';

type CreateGameProps = {
  navigation: StackNavigationProp<StackParams, 'CreateGame'>;
};

export default function CreateGame({ navigation }: CreateGameProps) {
  const [startTime, setStartTime] = useState<number>(-1);
  const dispatch = useDispatch();
  const players = useSelector<RootState, PlayerType[]>(playersSelector);
  const status = useSelector<RootState, GameStatus>(gameStatus);
  const isHost = useSelector<RootState, boolean>(isHostSelector);
  const gameType = useSelector<RootState, number>(gameTypeSelector);
  const gameCode = useSelector<RootState, string>(codeSelector);
  const gameStart = useSelector<RootState, number>(startSelector);

  useEffect(() => {
    if (gameType === 0) navigation.goBack();
    if (!gameCode) dispatch(createGame(gameType));
  }, []);

  useEffect(() => {
    if (status === GameStatus.LOBBY) return;
    if (status === GameStatus.PLAYING) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }, { name: 'PlayGame' }],
      });
    } else {
      dispatch(clearGame());
      dispatch(displayAlert('GAME_DELETED'));
      goBack();
    }
    dispatch(setGameStatus(GameStatus.LOBBY));
  }, [status]);

  useEffect(() => {
    if (!gameStart) return;
    const interval = setInterval(() => {
      const startDiff = Math.ceil((gameStart - Date.now()) / 1000);
      setStartTime(startDiff);
      if (startDiff <= 0) {
        clearInterval(interval);
        setStartTime(-1);
      }
    }, 1000);
  }, [gameStart]);

  const goBack = () => {
    navigation.goBack();
  };
  const goGame = () => {
    Firebase.startGame();
  };
  if (gameStart && gameStart >= Date.now() - 10000) {
    return <StartOverlay startTime={startTime} />;
  } else {
    return (
      <View style={styles.container}>
        <GameHeader onBack={goBack} />
        <Text style={HEADER_TEXT}>PLAYERS 2+</Text>
        <ScrollView
          contentContainerStyle={styles.players}
          style={styles.playersOuter}
        >
          {players.map((player: PlayerType, index: number) => (
            <Player key={player.id} name={player.name} index={index} />
          ))}
        </ScrollView>
        <BlockButton
          style={{ marginBottom: safeAreaInsets.bottom || 20 }}
          /*{FIXME SHOULD BE 2 not 0}*/
          text={players.length >= 2 && isHost ? 'START GAME' : 'WAITING . . .'}
          disabled={!isHost || players.length < 2}
          onPress={goGame}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  playersOuter: {
    flex: 1,
    margin: 5,
  },
  players: {
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});
