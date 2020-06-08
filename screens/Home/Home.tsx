import { StackNavigationProp } from '@react-navigation/stack';
import Constants from 'expo-constants';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { StackParams } from '../../App';
import BlockButton from '../../components/BlockButton';
import { setGameType } from '../../redux/actions/game';
import { userPopup } from '../../redux/actions/status';
import { setUser } from '../../redux/actions/user';
import { RootState } from '../../redux/reducers';
import { userSelector } from '../../redux/selectors';
import { MSG_TEXT } from '../../util/styles';
import { setInsets } from '../../util/theme';
import { User } from '../../util/types';
import CreateGameGrid from './CreateGameGrid';
import HomeTitle from './HomeTitle';

type HomeProps = {
  navigation: StackNavigationProp<StackParams, 'Home'>;
};

export default function Home({ navigation }: HomeProps) {
  const insets = useSafeArea();
  const dispatch = useDispatch();
  const user = useSelector<RootState, User>(userSelector);

  React.useEffect(() => {
    setInsets(insets);
    if (!user.name) {
      dispatch(userPopup(setUserName));
    }
  }, []);

  const setUserName = (name: string) => {
    dispatch(
      setUser({
        name,
        id: Constants.deviceId,
      })
    );
  };

  const goJoin = () => {
    navigation.navigate('JoinGame');
  };

  const goCreate = (newGame: number) => {
    navigation.navigate('CreateGame');
    dispatch(setGameType(newGame));
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
