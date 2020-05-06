import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { StackParams } from '../App';
import GameHeader from '../components/GameHeader';
import ItemSet from '../components/ItemSet';

type PlayGameProps = {
  navigation: StackNavigationProp<StackParams, 'PlayGame'>;
};

export default function PlayGame({ navigation }: PlayGameProps) {
  const [selected, setSelected] = useState<number[]>([0, 3, 2]);

  const goBack = () => {
    navigation.goBack();
  };

  const openCamera = (index: number) => {
    navigation.navigate('Vision');
    const newVal = [...selected];
    newVal[index]++;
    setSelected(newVal);
  };

  return (
    <View style={styles.container}>
      <GameHeader backText="Exit" onBack={goBack} />
      {[...Array(3)].map((value, index) => (
        <ItemSet
          key={index}
          style={styles.itemSet}
          selected={selected[index]}
          index={index}
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
  itemSet: {
    margin: 10,
  },
});
