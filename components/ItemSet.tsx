import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { color, fonts, layout, theme } from '../util/theme';
import { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import CircleButton from './CircleButton';

type Props = {
  style?: any;
  selected: number;
  index: number;
  onPress(index: number): void;
};
type ItemProps = {
  onPress(): void;
};
type OffProps = {
  isDone: boolean;
  complete: boolean;
};

function Item({ onPress }: ItemProps) {
  return (
    <TouchableOpacity
      activeOpacity={theme.activeOpacity}
      onPress={onPress}
      style={[styles.item, styles.large]}
    >
      <Text style={styles.itemText}>Item</Text>
    </TouchableOpacity>
  );
}

function ItemOff({ isDone, complete }: OffProps) {
  return (
    <View style={[styles.item, complete ? styles.large : null]}>
      {isDone ? (
        <Feather name="check" size={35} color={color.success} />
      ) : (
        <Feather name="lock" size={35} color={color.white} />
      )}
    </View>
  );
}

export default function ItemSet({ style, onPress, selected, index }: Props) {
  const newIndex = () => {
    onPress(index);
  };
  return (
    <View style={[styles.container, style]}>
      {[...Array(3)].map((value, i) =>
        selected === i ? (
          <Item key={value} onPress={newIndex} />
        ) : (
          <ItemOff isDone={i < selected} complete={selected > 2} />
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 70,
  },
  large: {
    flex: 1,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.items.blue,
    margin: 2.5,
    borderRadius: 10,
    flexBasis: 70,
  },
  itemText: {
    color: color.white,
    fontFamily: fonts.quicksand.bold,
    fontSize: 20,
  },
});
