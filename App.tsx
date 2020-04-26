import { Feather } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import * as React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import CreateGame from './screens/CreateGame';
import Home from './screens/Home';
import JoinGame from './screens/JoinGame';
import PlayGame from './screens/PlayGame';
import Vision from './screens/Vision';

export type RootStackParams = {
  Main: undefined;
  Vision: undefined;
};

export type StackParams = {
  Home: undefined;
  CreateGame: undefined;
  JoinGame: undefined;
  PlayGame: undefined;
  Vision: undefined;
};

const RootStack = createStackNavigator<RootStackParams>();
const Stack = createStackNavigator<StackParams>();

function StackScreen() {
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="none">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="JoinGame" component={JoinGame} />
      <Stack.Screen name="CreateGame" component={CreateGame} />
      <Stack.Screen name="PlayGame" component={PlayGame} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load fonts
        await Font.loadAsync({
          ...Feather.font,
          Bungee: require('./assets/fonts/Bungee.ttf'),
          QuicksandReg: require('./assets/fonts/Quicksand-Regular.ttf'),
          QuicksandMed: require('./assets/fonts/Quicksand-Medium.ttf'),
          QuicksandBold: require('./assets/fonts/Quicksand-Bold.ttf'),
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
      <SafeAreaProvider>
        <StatusBar
          barStyle="dark-content"
          translucent
          backgroundColor="#0000"
        />
        <NavigationContainer>
          <RootStack.Navigator mode="modal" headerMode="none">
            <RootStack.Screen name="Main" component={StackScreen} />
            <RootStack.Screen name="Vision" component={Vision} />
          </RootStack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}
