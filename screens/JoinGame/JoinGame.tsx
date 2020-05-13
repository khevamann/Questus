import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { StackParams } from '../../App';
import BlockButton from '../../components/BlockButton';
import GameHeader from '../../components/GameHeader';
import { joinGame, setGameType } from '../../redux/actions/gameAction';
import { RootState } from '../../redux/reducers';
import { gameTypeSelector } from '../../redux/selectors';
import { getGameFromChar } from '../../util/helpers';
import { MSG_TEXT } from '../../util/styles';
import { safeAreaInsets } from '../../util/theme';
import CodeInput from './CodeInput';

type JoinGameProps = {
  navigation: StackNavigationProp<StackParams, 'JoinGame'>;
};

export default function JoinGame({ navigation }: JoinGameProps) {
  const [code, updateCode] = useState<string>('');
  const dispatch = useDispatch();
  const gameType = useSelector<RootState, number>(gameTypeSelector);

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
    if (code.length === 1) {
      const itemNum = getGameFromChar(code);
      if (itemNum >= 3 && itemNum <= 12 && gameType !== itemNum)
        dispatch(setGameType(itemNum));
    }
    if (code.length === 4 && code.match(/[A-Z]\d[A-Z]\d/g)) {
      //FIXME SHould check if it is a valid code and if so wait goto the game screen. if not show the alert

      dispatch(joinGame(code));
      if (code !== 'WEDX') {
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
