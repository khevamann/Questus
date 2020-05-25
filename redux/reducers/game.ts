import { GameData, GameItem, ItemStatus, PlayerType } from '../../util/types';
import {
  CLEAR_GAME,
  INCREMENT_SCORE,
  SET_GAME_ITEMS,
  SET_GAME_OPTS,
  SET_GAME_PLAYERS,
  SET_ITEM_COMPLETE,
  SETUP_GAME,
} from '../actions/actionTypes';

const initialState: GameData = {
  gameId: '',
  startTime: null,
  host: '',
  players: [],
  gameType: 0,
  gameCode: '',
  items: [],
};

const updateItems = (items: GameItem[][], index: number) => {
  return items.map((set, sIdx) => {
    // Get the set from the index
    if (sIdx === ~~(index / 3))
      return set.map((item, iIdx) => {
        // Set the current index to completed
        if (iIdx === index % 3) return { ...item, status: ItemStatus.COMPLETE };
        // Set the next item to in progress
        if (iIdx === (index % 3) + 1)
          return { ...item, status: ItemStatus.INPROGRESS };
        return item;
      });
    return set;
  });
};

const addScore = (players: PlayerType[], userId: string) => {
  return players.map((player) => {
    if (player.id === userId) return { ...player, score: player.score + 1 };
    return player;
  });
};

const gameReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SETUP_GAME:
      return {
        ...state,
        ...action.payload,
      };
    case SET_GAME_OPTS:
      return { ...state, gameType: action.payload };
    case SET_GAME_ITEMS:
      return { ...state, items: action.payload };
    case SET_ITEM_COMPLETE:
      return {
        ...state,
        items: updateItems(state.items, action.payload),
      };
    case SET_GAME_PLAYERS:
      return { ...state, players: action.payload };
    case INCREMENT_SCORE:
      return { ...state, players: addScore(state.players, action.payload) };
    case CLEAR_GAME:
      return initialState;
    default:
      return state;
  }
};
export default gameReducer;