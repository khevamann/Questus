import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { bungeeText } from '../../util/styles';
import { color } from '../../util/theme';

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
    ...bungeeText(120),
    color: color.blue,
  },
  mainText: {
    ...bungeeText(60),
    color: color.blue,
  },
});
