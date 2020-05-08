import { GameItem, ItemStatus, PlayerType } from '../util/types';

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

const joinGame = async (code: string): Promise<PlayerType[]> => {
  return new Promise((resolve, reject) => {
    if (code[0] === '0') return reject(new Error('Game DNE'));
    return setTimeout(() => {
      return resolve(TEST_PLAYERS);
    }, 10);
  });
};
const createGame = async (code: string): Promise<string> => {
  return new Promise((resolve) => {
    return setTimeout(() => {
      return resolve(code);
    }, 10);
  });
};
const validateCode = (code: string) => {
  return code.match(/[A-Z]\d[A-Z]\d/g);
};

const getRandItems = async (count: number): Promise<GameItem[][]> => {
  return new Promise((resolve) => {
    return resolve(
      Array.from(Array(count / 3)).map((val, index) => [
        { name: `Item ${index * 3 + 1}`, status: ItemStatus.INPROGRESS },
        { name: `Item ${index * 3 + 2}`, status: ItemStatus.INCOMPLETE },
        { name: `Item ${index * 3 + 3}`, status: ItemStatus.INCOMPLETE },
      ])
    );
  });
};

const DataService = {
  joinGame,
  createGame,
  validateCode,
  getRandItems,
};

export default DataService;
