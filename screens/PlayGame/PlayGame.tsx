import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { StackParams } from '../../App';
import GameHeader from '../../components/GameHeader';
import { RootState } from '../../redux/reducers';
import {
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
  const gameType = useSelector<RootState, number>(gameTypeSelector);
  const players = useSelector<RootState, PlayerType[]>(playersSelector);
  const items = useSelector<RootState, GameItem[][]>(itemsSelector);

  useEffect(() => {
    if (gameType === 0) goBack();
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

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
      <LeaderBoard players={players} maxScore={gameType} />
      <Text style={HEADER_TEXT}>YOUR LIST</Text>
      {items.map((value, index) => (
        <ItemSet
          key={index}
          setIndex={index}
          items={value}
          onPress={openCamera}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
