import * as React from 'react';
import { Image, View } from 'react-native';

import { layout } from '../../util/theme';

type Props = {
  style?: any;
};

export default function FocusGrid({ style }: Props) {
  return (
    <View style={style}>
      <Image
        style={{
          position: 'absolute',
          left: layout.screenWidth * 0.1,
          top: '20%',
        }}
        source={require('../../assets/images/focus.png')}
      />
      <Image
        style={{
          transform: [{ rotate: '90deg' }],
          position: 'absolute',
          right: layout.screenWidth * 0.1,
          top: '20%',
        }}
        source={require('../../assets/images/focus.png')}
      />
      <Image
        style={{
          transform: [{ rotate: '180deg' }],
          position: 'absolute',
          right: layout.screenWidth * 0.1,
          bottom: '20%',
        }}
        source={require('../../assets/images/focus.png')}
      />
      <Image
        style={{
          transform: [{ rotate: '270deg' }],
          position: 'absolute',
          left: layout.screenWidth * 0.1,
          bottom: '20%',
        }}
        source={require('../../assets/images/focus.png')}
      />
    </View>
  );
}
