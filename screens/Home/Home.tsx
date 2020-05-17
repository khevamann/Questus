import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { StackParams } from '../../App';
import BlockButton from '../../components/BlockButton';
import Firebase from '../../providers/firebase';
import { clearGame, setGameType } from '../../redux/actions/game';
import { setUser } from '../../redux/actions/user';
import { RootState } from '../../redux/reducers';
import { gameTypeSelector, userSelector } from '../../redux/selectors';
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
  const gameType = useSelector<RootState, number>(gameTypeSelector);

  React.useEffect(() => {
    setInsets(insets);
    if (!user.id) {
      console.log('Updating User');
      Firebase.newUser().then((newUser: User) => {
        dispatch(setUser(newUser));
      });
      if (user.avatar === '') {
        //FIXME Prompt for user name and photo
      }
    }
    //store.default().persistor.purge();
  }, []);

  const goJoin = () => {
    if (gameType !== 0) {
      Alert.alert(
        'Game in Progress',
        'To join a new game you must quit your current game.'
      );
      return;
    }
    navigation.navigate('JoinGame');
  };
  const goCreate = (newGame: number) => {
    if (gameType !== 0) {
      Alert.alert(
        'Game in Progress',
        'To create a new game you must quit your current game.'
      );
      return;
    }
    navigation.navigate('CreateGame');
    dispatch(setGameType(newGame));
  };

  const quitGame = () => {
    dispatch(clearGame());
  };
  const continueGame = () => {
    navigation.navigate('CreateGame');
  };

  return (
    <View style={{ ...styles.container, paddingTop: insets.top }}>
      {gameType !== 0 && (
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
