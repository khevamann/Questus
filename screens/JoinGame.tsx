import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { StackParams } from '../App';
import BlockButton from '../components/BlockButton';
import CodeInput from '../components/CodeInput';
import GameHeader from '../components/GameHeader';
import DataService from '../providers/dataservice';
import { setGameCode, setGameType } from '../redux/actions/gameAction';
import { RootState } from '../redux/reducers';
import { gameTypeSelector } from '../redux/selectors';
import { getGameFromChar } from '../util/helpers';
import { MSG_TEXT } from '../util/styles';
import { safeAreaInsets } from '../util/theme';

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
    if (code.length === 4) {
      if (DataService.validateCode(code)) {
        goGame();
        dispatch(setGameCode(code));
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
      <GameHeader backText="Back" onBack={goBack} />
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
