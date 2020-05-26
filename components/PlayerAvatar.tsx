import * as React from 'react';
import { Image } from 'react-native';

type Props = {
  src: string;
  style?: any;
};

export default function PlayerAvatar({ src, style }: Props) {
  return (
    <>
      {src !== '' ? (
        <Image style={style} source={{ uri: src }} />
      ) : (
        <Image
          style={style}
          source={require('../assets/images/profileBlank.png')}
        />
      )}
    </>
  );
}
