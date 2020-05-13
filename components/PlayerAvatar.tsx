import * as React from 'react';
import { Image } from 'react-native';

import { AVATAR_LARGE } from '../util/styles';

type Props = {
  src: string;
};

export default function PlayerAvatar({ src }: Props) {
  return (
    <>
      {src !== '' ? (
        <Image style={AVATAR_LARGE} source={{ uri: src }} />
      ) : (
        <Image
          style={AVATAR_LARGE}
          source={require('../assets/images/profileBlank.png')}
        />
      )}
    </>
  );
}
