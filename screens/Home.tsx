import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

import { StackParams } from '../App';
import BlockButton from '../components/BlockButton';
import CreateGameGrid from '../components/CreateGameGrid';
import HomeTitle from '../components/HomeTitle';
import { setGameType } from '../redux/actions/gameAction';
import { MSG_TEXT } from '../util/styles';
import { setInsets } from '../util/theme';

type HomeProps = {
  navigation: StackNavigationProp<StackParams, 'Home'>;
};

export default function Home({ navigation }: HomeProps) {
  const insets = useSafeArea();
  const dispatch = useDispatch();
  setInsets(insets);

  const goJoin = () => {
    navigation.navigate('JoinGame');
  };
  const goCreate = (gameType: number) => {
    dispatch(setGameType(gameType));
    navigation.navigate('CreateGame');
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
