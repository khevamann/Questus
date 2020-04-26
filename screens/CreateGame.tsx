import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { StackParams } from '../App';
import GameHeader from '../components/GameHeader';

type CreateGameProps = {
  route: RouteProp<StackParams, 'CreateGame'>;
  navigation: StackNavigationProp<StackParams, 'CreateGame'>;
};

export default function CreateGame({ route, navigation }: CreateGameProps) {
  const { options } = route.params;
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <GameHeader
        options={options}
        gameCode="6TK8"
        backText="Back"
        onBack={goBack}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
