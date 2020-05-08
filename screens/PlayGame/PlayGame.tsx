import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { StackParams } from '../../App';
import GameHeader from '../../components/GameHeader';
import DataService from '../../providers/dataservice';
import { setGameItems } from '../../redux/actions/gameAction';
import { RootState } from '../../redux/reducers';
import { gameTypeSelector, itemsSelector } from '../../redux/selectors';
import { GameItem } from '../../util/types';
import ItemSet from './ItemSet';

type PlayGameProps = {
  navigation: StackNavigationProp<StackParams, 'PlayGame'>;
};

const colors = ['green', 'orange', 'red', 'blue'];

export default function PlayGame({ navigation }: PlayGameProps) {
  const dispatch = useDispatch();
  const gameType = useSelector<RootState, number>(gameTypeSelector);
  const items = useSelector<RootState, GameItem[][]>(itemsSelector);

  useEffect(() => {
    DataService.getRandItems(gameType).then((items: GameItem[][]) => {
      dispatch(setGameItems(items));
    });
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

  const openCamera = (index: number, setIndex: number) => {
    navigation.navigate('Vision', {
      itemIndex: index + setIndex * 3,
      itemName: items[setIndex][index].name,
    });
  };

  return (
    <View style={styles.container}>
      <GameHeader backText="Exit" onBack={goBack} />
      {items.map((value, index) => (
        <ItemSet
          key={index}
          setColor={colors[index]}
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
