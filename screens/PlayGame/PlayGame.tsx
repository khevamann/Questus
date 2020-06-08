import { useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { useEffect } from 'react';
import { BackHandler, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { StackParams } from '../../App';
import GameHeader from '../../components/GameHeader';
import { clearGame } from '../../redux/actions/game';
import { displayCustomAlert } from '../../redux/actions/status';
import { RootState } from '../../redux/reducers';
import {
  gameOverSelector,
  gameTypeSelector,
  itemsSelector,
  playersSelector,
} from '../../redux/selectors';
import { HEADER_TEXT } from '../../util/styles';
import { GameItem, PlayerType } from '../../util/types';
import ItemSet from './ItemSet';
import LeaderBoard from './LeaderBoard';

type PlayGameProps = {
  navigation: StackNavigationProp<StackParams, 'PlayGame'>;
};

export default function PlayGame({ navigation }: PlayGameProps) {
  const dispatch = useDispatch();
  const gameType = useSelector<RootState, number>(gameTypeSelector);
  const players = useSelector<RootState, PlayerType[]>(playersSelector);
  const gameOver = useSelector<RootState, string>(gameOverSelector);
  const items = useSelector<RootState, GameItem[][]>(itemsSelector);

  useEffect(() => {
    if (gameType === 0) goBack();
  }, []);

  const goBack = () => {
    if (gameOver) {
      dispatch(clearGame());
      navigation.goBack();
      return true;
    }
    dispatch(
      displayCustomAlert('GAME_IN_PROGRESS', {
        onPress: () => {
          dispatch(clearGame());
          navigation.goBack();
        },
      })
    );
    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', goBack);
      return () => BackHandler.removeEventListener('hardwareBackPress', goBack);
    }, [])
  );

  const openCamera = (index: number, setIndex: number) => {
    navigation.navigate('Vision', {
      itemIndex: index + setIndex * 3,
      item: items[setIndex][index],
    });
  };

  return (
    <View style={styles.container}>
      <GameHeader onBack={goBack} />
      <Text style={HEADER_TEXT}>LEADERBOARD</Text>
      <LeaderBoard
        players={players}
        isGameActive={!gameOver}
        maxScore={gameType}
      />
      {!gameOver && (
        <>
          <Text style={HEADER_TEXT}>YOUR LIST</Text>
          {items.map((value, index) => (
            <ItemSet
              key={index}
              setIndex={index}
              items={value}
              onPress={openCamera}
            />
          ))}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
