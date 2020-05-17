import { color } from './theme';

export enum ItemStatus {
  INCOMPLETE = -1,
  INPROGRESS = 0,
  COMPLETE = 1,
}

export enum LoadingStatus {
  FAILED = -1,
  LOADING = 0,
  SUCCESS = 1,
}

export enum GameStatus {
  DELETED = -1,
  LOBBY = 0,
  PLAYING = 1,
}

export type GameConfig = {
  itemCount: number;
  primaryColor: string;
  secondaryColor: string;
};

export type PlayerType = {
  id?: string;
  name: string;
  avatar: string;
  score?: number;
  isHost?: boolean;
};

export type Status = {
  join: {
    status: LoadingStatus;
    errCode: string;
  };
  game: {
    status: GameStatus;
  };
};

export type GameData = {
  gameId?: string;
  startTime?: number;
  gameListener?(): void;
  host: string;
  gameType: number;
  players: PlayerType[];
  gameCode: string;
  items: GameItem[][];
};

export type User = {
  id: string;
  name: string;
  avatar: string;
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
