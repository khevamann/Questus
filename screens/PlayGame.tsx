import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { StackParams } from '../App';
import GameHeader from '../components/GameHeader';
import ItemSet from '../components/ItemSet';

type PlayGameProps = {
  route: RouteProp<StackParams, 'PlayGame'>;
  navigation: StackNavigationProp<StackParams, 'PlayGame'>;
};

export default function PlayGame({ route, navigation }: PlayGameProps) {
  const { options } = route.params;
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
      <GameHeader
        options={options}
        gameCode="6TK8"
        backText="Back"
        onBack={goBack}
      />
      {[...Array(3)].map((value, index) => (
        <ItemSet
          key={value}
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
