import { Feather } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import * as React from "react";
import { Platform, StatusBar } from "react-native";

import Home from "./screens/Home";
import Camera from "./screens/Camera";

export type RootStackParamList = {
  Home: undefined;
  Camera: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load fonts
        await Font.loadAsync({
          ...Feather.font,
          Bungee: require("./assets/fonts/Bungee.ttf"),
          Quicksand: require("./assets/fonts/Quicksand.ttf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
        <>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}

          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Camera" component={Camera} />
            </Stack.Navigator>
          </NavigationContainer>
        </>
    );
  }
}
