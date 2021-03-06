import { Platform, TextStyle, ViewStyle } from 'react-native';

import { color, fonts } from './theme';

export const HEADER_TEXT: TextStyle = {
  fontFamily: fonts.quicksand.bold,
  fontSize: 18,
  margin: 15,
  marginTop: 20,
  color: color.light,
};

export const SHADOW: ViewStyle = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
};

export const bungeeText = (size: number) => {
  return {
    fontFamily: fonts.bungee,
    lineHeight: size,
    fontSize: size,
    marginBottom: Platform.select({ ios: -size / 5, android: 0 }),
    color: color.white,
  };
};

export const MSG_TEXT: TextStyle = {
  fontFamily: fonts.quicksand.medium,
  textTransform: 'uppercase',
  textAlign: 'center',
  fontSize: 16,
  marginHorizontal: 80,
  marginVertical: 40,
};

export const FA_ICON: TextStyle = {
  marginTop: Platform.select({ ios: 4, android: 0 }),
};
