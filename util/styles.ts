import { ImageStyle, TextStyle } from 'react-native';

import { color, fonts } from './theme';

export const HEADER_TEXT: TextStyle = {
  fontFamily: fonts.quicksand.bold,
  fontSize: 18,
  margin: 15,
  marginTop: 20,
  color: color.light,
};

export const MSG_TEXT: TextStyle = {
  fontFamily: fonts.quicksand.medium,
  textTransform: 'uppercase',
  textAlign: 'center',
  fontSize: 16,
  marginHorizontal: 80,
  marginVertical: 40,
};

export const AVATAR_LARGE: ImageStyle = {
  width: 120,
  height: 120,
  borderRadius: 60,
};
