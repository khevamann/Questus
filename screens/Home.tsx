import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';

import { StackParams } from '../App';
import BlockButton from '../components/BlockButton';
import CreateGameGrid from '../components/CreateGameGrid';
import HomeTitle from '../components/HomeTitle';
import { MSG_TEXT } from '../util/styles';
import { color, setInsets } from '../util/theme';
import { GameConfig } from '../util/types';

type HomeProps = {
  route: RouteProp<StackParams, 'Home'>;
  navigation: StackNavigationProp<StackParams, 'Home'>;
};

export default function Home({ navigation }: HomeProps) {
  const insets = useSafeArea();
  setInsets(insets);

  const goJoin = () => {
    const options: GameConfig = {
      gameId: '3',
      primaryColor: color.home.green,
      secondaryColor: color.home.red,
    };
    navigation.navigate('JoinGame', { options });
  };
  const goCreate = (options: GameConfig) => {
    navigation.navigate('CreateGame', { options });
  };

  return (
    <View style={{ ...styles.container, paddingTop: insets.top }}>
      <HomeTitle />
      <BlockButton style={styles.joinBtn} text="Join Game" onPress={goJoin} />
      <Text style={styles.startText}>
        If you don't have a code start a game below
      </Text>
      <CreateGameGrid onPress={goCreate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  joinBtn: {
    marginTop: 30,
  },
  startText: {
    ...MSG_TEXT,
  },
});
