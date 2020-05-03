import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { StackParams } from '../App';
import BlockButton from '../components/BlockButton';
import GameHeader from '../components/GameHeader';
import { fonts, safeAreaInsets } from '../util/theme';
import { MSG_TEXT } from '../util/styles';
import CodeInput from '../components/CodeInput';

type JoinGameProps = {
  route: RouteProp<StackParams, 'JoinGame'>;
  navigation: StackNavigationProp<StackParams, 'JoinGame'>;
};

export default function JoinGame({ navigation, route }: JoinGameProps) {
  const { options } = route.params;

  const goBack = () => {
    navigation.goBack();
  };
  const goGame = () => {
    navigation.navigate('PlayGame', { options });
  };

  return (
    <View style={styles.container}>
      <GameHeader
        options={options}
        gameCode="6TK8"
        backText="Back"
        onBack={goBack}
      />
      <Text style={styles.textMsg}>
        Ask your group leader for the code and enter it here.
      </Text>
      <CodeInput />
      <BlockButton
        style={{ marginBottom: safeAreaInsets.bottom }}
        text="START GAME"
        onPress={goGame}
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
