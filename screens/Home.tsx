import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';

import { StackParams } from '../App';
import BlockButton from '../components/BlockButton';
import CreateGameGrid from '../components/CreateGameGrid';
import HomeTitle from '../components/HomeTitle';
import { fonts } from '../util/theme';
import { GameConfig } from '../util/types';

type HomeProps = {
  route: RouteProp<StackParams, 'Home'>;
  navigation: StackNavigationProp<StackParams, 'Home'>;
};

export default function Home({ navigation }: HomeProps) {
  const goCamera = () => {
    navigation.navigate('Vision');
  };
  const goCreate = (options: GameConfig) => {
    navigation.navigate('CreateGame', { options });
  };

  return (
    <SafeAreaView style={styles.container}>
      <HomeTitle />
      <BlockButton style={styles.joinBtn} text="Join Game" onPress={goCamera} />
      <Text style={styles.startText}>
        If you don't have a code start a game below
      </Text>
      <CreateGameGrid onPress={goCreate} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  joinBtn: {
    marginVertical: 30,
  },
  startText: {
    fontFamily: fonts.quicksand.medium,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 16,
    marginHorizontal: 80,
    marginBottom: 40,
  },
});
