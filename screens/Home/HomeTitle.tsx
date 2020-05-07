import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { color, fonts } from '../../util/theme';

export default function HomeTitle() {
  return (
    <View style={styles.container}>
      <Text style={styles.qText}>Q</Text>
      <Text style={styles.mainText}>uestus</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
    alignItems: 'baseline',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  qText: {
    fontFamily: fonts.bungee,
    color: color.blue,
    fontSize: 120,
    lineHeight: 120,
    padding: 0,
    margin: 0,
  },
  mainText: {
    fontFamily: fonts.bungee,
    color: color.blue,
    fontSize: 60,
    lineHeight: 60,
    padding: 0,
    margin: 0,
  },
});
