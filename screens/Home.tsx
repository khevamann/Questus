import { Feather } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';

import { RootStackParamList } from '../App';
import { color } from '../util/theme';

type HomeProps = {
  route: RouteProp<RootStackParamList, 'Home'>;
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

export default function Home({ navigation }: HomeProps) {
  const goCamera = () => {
    navigation.navigate('Vision');
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight style={styles.cameraBtn} onPress={goCamera}>
        <Feather name="camera" size={50} color="white" />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraBtn: {
    margin: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.blue,
    borderWidth: 3,
    borderColor: color.light,
    width: 150,
    height: 150,
    borderRadius: 75,
  },
});
