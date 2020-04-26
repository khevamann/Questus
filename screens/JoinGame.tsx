import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

import { StackParams } from '../App';

type JoinGameProps = {
  route: RouteProp<StackParams, 'JoinGame'>;
  navigation: StackNavigationProp<StackParams, 'JoinGame'>;
};

export default function JoinGame({ navigation }: JoinGameProps) {
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
