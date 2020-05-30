import { StackNavigationProp } from '@react-navigation/stack';
import Constants from 'expo-constants';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { StackParams } from '../../App';
import BlockButton from '../../components/BlockButton';
import { clearGame, setGameType } from '../../redux/actions/game';
import { displayAlert, userPopup } from '../../redux/actions/status';
import { setUser } from '../../redux/actions/user';
import { RootState } from '../../redux/reducers';
import {
  gameTypeSelector,
  startSelector,
  userSelector,
} from '../../redux/selectors';
import { MSG_TEXT } from '../../util/styles';
import { setInsets } from '../../util/theme';
import { User } from '../../util/types';
import CreateGameGrid from './CreateGameGrid';
import HomeTitle from './HomeTitle';
import InProgress from './InProgress';

type HomeProps = {
  navigation: StackNavigationProp<StackParams, 'Home'>;
};

export default function Home({ navigation }: HomeProps) {
  const insets = useSafeArea();
  const dispatch = useDispatch();
  const user = useSelector<RootState, User>(userSelector);
  const startTime = useSelector<RootState, number>(startSelector);
  const gameType = useSelector<RootState, number>(gameTypeSelector);

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
    if (gameType !== 0) {
      dispatch(displayAlert('GAME_IN_PROGRESS'));
      return;
    }
    navigation.navigate('JoinGame');
  };

  const goCreate = (newGame: number) => {
    if (gameType !== 0) {
      dispatch(displayAlert('GAME_IN_PROGRESS'));
      return;
    }
    navigation.navigate('CreateGame');
    dispatch(setGameType(newGame));
  };

  const quitGame = () => {
    dispatch(clearGame());
  };
  const continueGame = () => {
    const inProgress = startTime && startTime <= 0;
    navigation.navigate(inProgress ? 'PlayGame' : 'CreateGame');
  };

  return (
    <View style={{ ...styles.container, paddingTop: insets.top }}>
      {gameType !== 0 && (
        //FIXME: REMOVE
        <InProgress
          onQuit={quitGame}
          onContinue={continueGame}
          topInset={insets.top}
        />
      )}
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
