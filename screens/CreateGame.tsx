import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';

import { StackParams } from '../App';
import BlockButton from '../components/BlockButton';
import GameHeader from '../components/GameHeader';
import { AVATAR_LARGE, HEADER_TEXT } from '../util/styles';
import { safeAreaInsets } from '../util/theme';

type CreateGameProps = {
  route: RouteProp<StackParams, 'CreateGame'>;
  navigation: StackNavigationProp<StackParams, 'CreateGame'>;
};

type Player = {
  name: string;
  avatar: string;
};

const Player = ({ name, avatar }: Player) => {
  return (
    <View style={styles.player}>
      <Image style={AVATAR_LARGE} source={{ uri: avatar }} />
      <Text style={styles.playerName}>{name}</Text>
    </View>
  );
};

const TEST_PLAYERS: Player[] = [
  {
    name: 'Player 1',
    avatar:
      'https://marav43842.i.lithium.com/t5/image/serverpage/image-id/209iA8553A9BB4ADD28C/image-size/large/is-moderation-mode/true?v=1.0&px=999',
  },
  {
    name: 'Player 2',
    avatar:
      'https://marav43842.i.lithium.com/t5/image/serverpage/image-id/209iA8553A9BB4ADD28C/image-size/large/is-moderation-mode/true?v=1.0&px=999',
  },
  {
    name: 'Player 3',
    avatar:
      'https://marav43842.i.lithium.com/t5/image/serverpage/image-id/209iA8553A9BB4ADD28C/image-size/large/is-moderation-mode/true?v=1.0&px=999',
  },
  {
    name: 'Player 4',
    avatar:
      'https://marav43842.i.lithium.com/t5/image/serverpage/image-id/209iA8553A9BB4ADD28C/image-size/large/is-moderation-mode/true?v=1.0&px=999',
  },
  {
    name: 'Player 5',
    avatar:
      'https://marav43842.i.lithium.com/t5/image/serverpage/image-id/209iA8553A9BB4ADD28C/image-size/large/is-moderation-mode/true?v=1.0&px=999',
  },
];

export default function CreateGame({ route, navigation }: CreateGameProps) {
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
      <Text style={HEADER_TEXT}>PLAYERS (2-8)</Text>
      <View style={styles.outerPlayers}>
        <View style={styles.players}>
          {TEST_PLAYERS.map((player: Player) => (
            <Player
              key={player.name}
              name={player.name}
              avatar={player.avatar}
            />
          ))}
        </View>
      </View>
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
  outerPlayers: {
    flex: 1,
    justifyContent: 'center',
  },
  players: {
    marginHorizontal: 30,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  player: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: '40%',
    alignItems: 'center',
    margin: 5,
  },
  playerName: {},
});
