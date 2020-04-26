import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';

import { StackParams } from '../App';

type PlayGameProps = {
  route: RouteProp<StackParams, 'PlayGame'>;
  navigation: StackNavigationProp<StackParams, 'PlayGame'>;
};

export default function PlayGame({ navigation }: PlayGameProps) {
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
