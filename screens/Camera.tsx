import { Feather } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import {Alert, StyleSheet, Text, TouchableHighlight, View} from "react-native";

import { RootStackParamList } from "../App";

type CameraProps = {
  route: RouteProp<RootStackParamList, "Camera">;
  navigation: StackNavigationProp<RootStackParamList, "Camera">;
};

export default function Camera({ navigation }: CameraProps) {
  const takePicture= () => {
    Alert.alert("Take Picture!")
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight style={styles.cameraBtn} onPress={takePicture}>
      <Feather name="camera" size={32} color="green" />
        <Text>Take Picture</Text>
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
