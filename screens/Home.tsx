import { Feather } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import {StyleSheet, TouchableHighlight, View} from "react-native";

import { RootStackParamList } from "../App";

type HomeProps = {
  route: RouteProp<RootStackParamList, "Home">;
  navigation: StackNavigationProp<RootStackParamList, "Home">;
};

export default function Home({ navigation }: HomeProps) {
  const goCamera= () => {
    navigation.navigate("Camera");
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight style={styles.cameraBtn} onPress={goCamera}>
      <Feather name="camera" size={32} color="green" />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraBtn: {
    backgroundColor: "blue",
  }
});
