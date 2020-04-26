import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';

import { StackParams } from '../App';

type CreateGameProps = {
  route: RouteProp<StackParams, 'CreateGame'>;
  navigation: StackNavigationProp<StackParams, 'CreateGame'>;
};

export default function CreateGame({ navigation }: CreateGameProps) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Start Here</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
