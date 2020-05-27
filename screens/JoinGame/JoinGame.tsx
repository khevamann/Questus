import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { StackParams } from '../../App';
import GameHeader from '../../components/GameHeader';
import { joinGame } from '../../redux/actions/game';
import { joinClear } from '../../redux/actions/status';
import { RootState } from '../../redux/reducers';
import {
  alertSelector,
  joinStatus,
  startSelector,
} from '../../redux/selectors';
import { MSG_TEXT } from '../../util/styles';
import { AlertConfig, LoadingStatus } from '../../util/types';
import CodeInput from './CodeInput';

type JoinGameProps = {
  navigation: StackNavigationProp<StackParams, 'JoinGame'>;
};

export default function JoinGame({ navigation }: JoinGameProps) {
  const [code, updateCode] = useState<string>('');
  const status = useSelector<RootState, LoadingStatus>(joinStatus);
  const startTime = useSelector<RootState, number>(startSelector);
  const alert = useSelector<RootState, AlertConfig>(alertSelector);
  const dispatch = useDispatch();

  const goBack = () => {
    navigation.goBack();
  };
  const goGame = async () => {
    const inProgress = startTime && startTime <= Date.now();
    navigation.reset({
      index: 0,
      routes: [
        { name: 'Home' },
        { name: inProgress ? 'PlayGame' : 'CreateGame' },
      ],
    });
  };

  useEffect(() => {
    if (status === 0) return;
    if (status === 1) {
      goGame();
    } else {
      updateCode('');
    }
    dispatch(joinClear());
  }, [status]);

  const setCode = (code: string) => {
    updateCode(code);
    if (code.length >= 4) dispatch(joinGame(code));
  };

  return (
    <View style={styles.container}>
      <GameHeader onBack={goBack} />
      <Text style={styles.textMsg}>
        Ask your host for the code and enter it here.
      </Text>
      <CodeInput code={code} editable={!alert} updateCode={setCode} />
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
