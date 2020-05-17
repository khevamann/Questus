import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { StackParams } from '../../App';
import BlockButton from '../../components/BlockButton';
import GameHeader from '../../components/GameHeader';
import { joinGame } from '../../redux/actions/gameAction';
import { MSG_TEXT } from '../../util/styles';
import { safeAreaInsets } from '../../util/theme';
import CodeInput from './CodeInput';

type JoinGameProps = {
  navigation: StackNavigationProp<StackParams, 'JoinGame'>;
};

export default function JoinGame({ navigation }: JoinGameProps) {
  const [code, updateCode] = useState<string>('');
  const dispatch = useDispatch();

  const goBack = () => {
    navigation.goBack();
  };
  const goGame = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }, { name: 'CreateGame' }],
    });
  };

  const setCode = (code: string) => {
    updateCode(code);
    if (code.length === 4 && code.match(/[A-Z]\d[A-Z]\d/g)) {
      dispatch(joinGame(code));
      //FIXME SHould check if it is a valid code and if so wait goto the game screen. if not show the alert
      if (code !== 'QQQQ') {
        /* TODO: Check if game has started,
         * if so put people straight to playGame
         * else put them in game
         */
        setTimeout(() => {
          goGame();
        }, 1000);
      } else {
        Alert.alert(
          'Invalid Game Code',
          "If you don't have a code go back and start a new game"
        );
        updateCode('');
      }
    }
  };

  return (
    <View style={styles.container}>
      <GameHeader onBack={goBack} />
      <Text style={styles.textMsg}>
        Ask your group leader for the code and enter it here.
      </Text>
      <CodeInput code={code} updateCode={setCode} />
      <BlockButton
        style={{ marginBottom: safeAreaInsets.bottom }}
        text={code.length === 4 ? 'JOINING . . .' : 'JOIN GAME'}
        onPress={() => {}}
        disabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textMsg: {
    ...MSG_TEXT,
  },
});
