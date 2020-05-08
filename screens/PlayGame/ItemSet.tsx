import { Feather } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { color, fonts, layout, theme } from '../../util/theme';
import { GameItem, ItemStatus } from '../../util/types';

type Props = {
  style?: any;
  items: GameItem[];
  onPress(index: number, setIndex: number): void;
  setIndex: number;
  setColor: string;
};
type ItemProps = {
  onPress(): void;
  name: string;
  setColor: string;
};
type OffProps = {
  complete: ItemStatus;
  setColor: string;
};

function Item({ onPress, name, setColor }: ItemProps) {
  return (
    <TouchableOpacity
      activeOpacity={theme.activeOpacity}
      onPress={onPress}
      style={[
        styles.item,
        styles.large,
        { backgroundColor: color.items[setColor] },
      ]}
    >
      <Text style={styles.itemText}>{name}</Text>
    </TouchableOpacity>
  );
}

function ItemOff({ complete, setColor }: OffProps) {
  return (
    <View style={[styles.item, { backgroundColor: color.items[setColor] }]}>
      {complete === ItemStatus.COMPLETE ? (
        <Feather name="check" size={35} color={color.success} />
      ) : (
        <Feather name="lock" size={35} color={color.white} />
      )}
    </View>
  );
}

export default function ItemSet({
  style,
  setColor,
  onPress,
  items,
  setIndex,
}: Props) {
  return (
    <View style={[styles.container, style]}>
      {items.map((value, index) =>
        value.status === ItemStatus.INPROGRESS ? (
          <Item
            key={`key${index + setIndex}`}
            setColor={setColor}
            name={value.name}
            onPress={() => onPress(index, setIndex)}
          />
        ) : (
          <ItemOff
            key={`key${index + setIndex}`}
            setColor={setColor}
            complete={value.status}
          />
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 70,
    margin: 10,
  },
  large: {
    flexBasis: layout.screenWidth - 90 * 2,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2.5,
    borderRadius: 10,
    flexGrow: 1,
    flexBasis: 70,
  },
  itemText: {
    color: color.white,
    fontFamily: fonts.quicksand.bold,
    fontSize: 20,
  },
});
