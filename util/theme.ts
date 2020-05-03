import { Platform, Dimensions } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';

export const color = {
  background: '#fdfdfd',
  blue: '#5790D0',
  purple: '#607DF7',
  danger: '#E08087',
  success: '#92F1CF',
  dark: '#444444',
  white: '#ffffff',
  transparent: '#ffffff00',
  semi: '#00000044',
  light: '#AAAAAA',
  snapchat: '#FEFE00',
  home: {
    green: '#397F4F',
    purple: '#664EF6',
    orange: '#EF7E4D',
    red: '#DB5461',
  },
  items: {
    green: '#397F4F',
    orange: '#EF7E4D',
    red: '#E08087',
    blue: '#34609F',
  },
};

export const theme = {
  activeOpacity: 0.6,
};

export const fonts = {
  bungee: Platform.select({ ios: 'Bungee', android: 'Bungee' }),
  quicksand: {
    regular: 'QuicksandReg',
    medium: 'QuicksandMed',
    bold: 'QuicksandBold',
  },
};

export const layout = {
  screenWidth: Dimensions.get('window').width,
  screenHeight: Dimensions.get('window').height,
  fullHeight: Dimensions.get('screen').height,
  isSmallDevice: Dimensions.get('window').width < 375,
};

export let safeAreaInsets: EdgeInsets = {
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
};

export function setInsets(insets: EdgeInsets) {
  safeAreaInsets = insets;
}
