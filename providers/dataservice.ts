import { PlayerType } from '../util/types';

export const TEST_PLAYERS: PlayerType[] = [
  {
    name: 'Player 1',
    isHost: true,
    avatar:
      'https://marav43842.i.lithium.com/t5/image/serverpage/image-id/209iA8553A9BB4ADD28C/image-size/large/is-moderation-mode/true?v=1.0&px=999',
  },
  {
    name: 'Player 2',
    isHost: false,
    avatar:
      'https://marav43842.i.lithium.com/t5/image/serverpage/image-id/209iA8553A9BB4ADD28C/image-size/large/is-moderation-mode/true?v=1.0&px=999',
  },
  {
    name: 'Player 3',
    isHost: false,
    avatar:
      'https://marav43842.i.lithium.com/t5/image/serverpage/image-id/209iA8553A9BB4ADD28C/image-size/large/is-moderation-mode/true?v=1.0&px=999',
  },
  {
    name: 'Player 4',
    isHost: false,
    avatar:
      'https://marav43842.i.lithium.com/t5/image/serverpage/image-id/209iA8553A9BB4ADD28C/image-size/large/is-moderation-mode/true?v=1.0&px=999',
  },
  {
    name: 'Player 5',
    isHost: false,
    avatar:
      'https://marav43842.i.lithium.com/t5/image/serverpage/image-id/209iA8553A9BB4ADD28C/image-size/large/is-moderation-mode/true?v=1.0&px=999',
  },
];

const joinGame = async (code: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (code[0] === 'A') return reject(new Error('Game DNE'));
    return resolve(TEST_PLAYERS);
  });
};
const createGame = async (code: string): Promise<string> => {
  return new Promise((resolve) => {
    return setTimeout(() => {
      return resolve(code);
    }, 2000);
  });
};
const validateCode = (code: string) => {
  return code.match(/[A-Z]\d[A-Z]\d/g);
};

const DataService = {
  joinGame,
  createGame,
  validateCode,
};

export default DataService;
