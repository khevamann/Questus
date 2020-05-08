import { color } from './theme';

export enum ItemStatus {
  INCOMPLETE = -1,
  INPROGRESS = 0,
  COMPLETE = 1,
}

export type GameConfig = {
  itemCount: number;
  primaryColor: string;
  secondaryColor: string;
};

export type PlayerType = {
  name: string;
  avatar: string;
  isHost?: boolean;
};

export type GameData = {
  gameType: number;
  players: PlayerType[];
  gameCode: string;
  items: GameItem[][];
};

export type GameItem = {
  name: string;
  status: ItemStatus;
};

type GameModeType = {
  item3: GameConfig;
  item6: GameConfig;
  item9: GameConfig;
  item12: GameConfig;
};

export const GameModes: GameModeType = {
  item3: {
    itemCount: 3,
    primaryColor: color.home.green,
    secondaryColor: color.home.red,
  },
  item6: {
    itemCount: 6,
    primaryColor: color.home.purple,
    secondaryColor: color.home.orange,
  },
  item9: {
    itemCount: 9,
    primaryColor: color.home.orange,
    secondaryColor: color.home.purple,
  },
  item12: {
    itemCount: 12,
    primaryColor: color.home.red,
    secondaryColor: color.home.green,
  },
};
