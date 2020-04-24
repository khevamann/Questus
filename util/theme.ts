import { Platform, Dimensions } from 'react-native';

export const color = {
  background: '#fdfdfd',
  blue: '#607DF7',
  danger: '#E08087',
  dark: '#444444',
  white: '#ffffff',
  light: '#AAAAAA',
  snapchat: '#FEFE00',
  home: {
    green: '#397F4F',
    purple: '#664EF6',
    orange: '#EF7E4D',
    red: '#E08087',
  },
};

export const fonts = {
  bungee: Platform.select({ ios: 'Bungee', android: 'Bungee' }),
  quicksand: Platform.select({ ios: 'Quicksand', android: 'Quicksand' }),
};

export const layout = {
  screenWidth: Dimensions.get('window').width,
  screenHeight: Dimensions.get('window').height,
  isSmallDevice: Dimensions.get('window').width < 375,
};
