import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { color, fonts, layout } from '../../util/theme';
import { PlayerType } from '../../util/types';

type Props = {
  players: PlayerType[];
  maxScore: number;
};

type LeaderProps = {
  player: PlayerType;
  bColor: string;
  maxScore: number;
};

const LeaderItem = ({
  player: { avatar, name, score },
  bColor,
  maxScore,
}: LeaderProps) => {
  return (
    <View style={styles.leaderCont}>
      <Image style={styles.leaderImg} source={{ uri: avatar }} />
      <View style={styles.leaderProgCont}>
        <View
          style={[
            styles.leaderProg,
            {
              width: (score / maxScore) * (layout.screenWidth - 160) + 40,
              backgroundColor: color.items[bColor],
            },
          ]}
        >
          {score >= maxScore / 2 && (
            <Text style={styles.leaderName}>{name}</Text>
          )}
        </View>
        {score < maxScore / 2 && (
          <Text style={{ ...styles.leaderName, color: color.dark }}>
            {name}
          </Text>
        )}
      </View>
      <Text style={styles.leaderScore}>{score}</Text>
    </View>
  );
};

export default function LeaderBoard({ players, maxScore }: Props) {
  return (
    <View style={styles.container}>
      {players
        .sort((a, b) => (a.score > b.score ? -1 : 1))
        .slice(0, 4)
        .map((player, index) => (
          <LeaderItem
            key={`player${index}`}
            bColor={Object.keys(color.items)[index % 4]}
            maxScore={maxScore}
            player={player}
          />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  leaderCont: {
    flexDirection: 'row',
    width: layout.screenWidth - 40,
    alignItems: 'center',
    marginVertical: 2,
  },
  leaderImg: {
    flex: 0,
    marginRight: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
  },
  leaderProgCont: {
    width: layout.screenWidth - 120,
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },
  leaderProg: {
    backgroundColor: color.purple,
    height: 30,
    borderRadius: 20,
    justifyContent: 'flex-end',
  },
  leaderName: {
    fontFamily: fonts.quicksand.bold,
    color: color.white,
    fontSize: 20,
    marginLeft: 15,
  },
  leaderScore: {
    width: 40,
    height: 30,
    textAlign: 'center',
    fontFamily: fonts.quicksand.bold,
    textTransform: 'uppercase',
    color: color.blue,
    fontSize: 30,
    lineHeight: 33,
  },
});
