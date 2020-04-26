import { Platform, Dimensions, StatusBar } from 'react-native';

export const color = {
  background: '#fdfdfd',
  blue: '#5790D0',
  purple: '#607DF7',
  danger: '#E08087',
  dark: '#444444',
  white: '#ffffff',
  light: '#AAAAAA',
  snapchat: '#FEFE00',
  home: {
    green: '#397F4F',
    purple: '#664EF6',
    orange: '#EF7E4D',
    red: '#DB5461',
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
