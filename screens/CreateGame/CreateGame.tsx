import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { StackParams } from '../../App';
import BlockButton from '../../components/BlockButton';
import GameHeader from '../../components/GameHeader';
import DataService from '../../providers/dataservice';
import { setGameCode, setGamePlayers } from '../../redux/actions/gameAction';
import { RootState } from '../../redux/reducers';
import {
  codeSelector,
  gameTypeSelector,
  playersSelector,
} from '../../redux/selectors';
import { generateGameCode } from '../../util/helpers';
import { HEADER_TEXT } from '../../util/styles';
import { safeAreaInsets } from '../../util/theme';
import { PlayerType } from '../../util/types';
import Player from './Player';

type CreateGameProps = {
  navigation: StackNavigationProp<StackParams, 'CreateGame'>;
};

export default function CreateGame({ navigation }: CreateGameProps) {
  const dispatch = useDispatch();
  const players = useSelector<RootState, PlayerType[]>(playersSelector);
  const gameType = useSelector<RootState, number>(gameTypeSelector);
  const gameCode = useSelector<RootState, string>(codeSelector);

  useEffect(() => {
    if (gameCode) {
      DataService.joinGame(gameCode).then((players: PlayerType[]) => {
        dispatch(setGamePlayers(players));
      });
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
});
