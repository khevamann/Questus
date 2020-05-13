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
      style={[styles.item, styles.large, { backgroundColor: setColor }]}
    >
      <Text style={styles.itemText}>{name}</Text>
    </TouchableOpacity>
  );
}

function ItemOff({ complete, setColor }: OffProps) {
  return (
    <View
      style={[
        styles.item,
        complete === ItemStatus.INCOMPLETE ? styles.itemLock : null,
        { backgroundColor: setColor },
      ]}
    >
      {complete === ItemStatus.COMPLETE ? (
        <Feather name="check" size={35} color={color.success} />
      ) : (
        <Feather name="lock" size={35} color={color.white} />
      )}
    </View>
  );
}

export default function ItemSet({ style, onPress, items, setIndex }: Props) {
  return (
    <View style={[styles.container, style]}>
      {items.map((value, index) =>
        value.status === ItemStatus.INPROGRESS ? (
          <Item
            key={`key${index + setIndex}`}
            setColor={color.items[setIndex % 4]}
            name={value.name}
            onPress={() => onPress(index, setIndex)}
          />
        ) : (
          <ItemOff
            key={`key${index + setIndex}`}
            setColor={color.items[setIndex % 4]}
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
  itemLock: {
    opacity: 0.6,
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
