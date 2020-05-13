import { GameItem, ItemStatus, PlayerType } from '../util/types';

export const TEST_PLAYERS: PlayerType[] = [
  {
    id: 'dgwj6dc87dc7d7chd7c',
    name: 'Player 1',
    avatar:
      'https://marav43842.i.lithium.com/t5/image/serverpage/image-id/209iA8553A9BB4ADD28C/image-size/large/is-moderation-mode/true?v=1.0&px=999',
    isHost: true,
    score: 0,
  },
  {
    id: 'my_sample_id',
    name: 'Kheva',
    avatar:
      'https://marav43842.i.lithium.com/t5/image/serverpage/image-id/209iA8553A9BB4ADD28C/image-size/large/is-moderation-mode/true?v=1.0&px=999',
    isHost: false,
    score: 2,
  },
  {
    id: 'dgwj6dc87dc7d7chdsc',
    name: 'Player 3',
    avatar:
      'https://marav43842.i.lithium.com/t5/image/serverpage/image-id/209iA8553A9BB4ADD28C/image-size/large/is-moderation-mode/true?v=1.0&px=999',
    isHost: false,
    score: 9,
  },
  {
    id: 'd21wj6dc87dc7d7chd7c',
    name: 'Player 4',
    avatar:
      'https://marav43842.i.lithium.com/t5/image/serverpage/image-id/209iA8553A9BB4ADD28C/image-size/large/is-moderation-mode/true?v=1.0&px=999',
    isHost: false,
    score: 7,
  },
  {
    id: 'dgwj6dc87dc7d7cuio7c',
    name: 'Player 5',
    avatar:
      'https://marav43842.i.lithium.com/t5/image/serverpage/image-id/209iA8553A9BB4ADD28C/image-size/large/is-moderation-mode/true?v=1.0&px=999',
    isHost: false,
    score: 1,
  },
];

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
  validateCode,
  getRandItems,
};

export default DataService;
