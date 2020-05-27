import { GameStatus, LoadingStatus, Status } from '../../util/types';
import {
  SET_JOIN_STATUS,
  SET_GAME_STATUS,
  SHOW_ALERT,
  HIDE_ALERT,
  CLEAR_JOIN_STATUS,
} from '../actions/actionTypes';

const initialState: Status = {
  join: { status: LoadingStatus.LOADING, errCode: null },
  game: { status: GameStatus.LOBBY },
  alert: null,
};

const statusReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_JOIN_STATUS:
      return {
        ...state,
        join: action.payload,
        alert: alerts[action.payload.errCode],
      };
    case CLEAR_JOIN_STATUS:
      return {
        ...state,
        join: initialState.join,
      };
    case SET_GAME_STATUS:
      return { ...state, game: action.payload };
    case SHOW_ALERT:
      return { ...state, alert: alerts[action.payload] };
    case HIDE_ALERT:
      return { ...state, alert: null };
    default:
      return state;
  }
};

export type AlertCode =
  | 'GAME_DNE'
  | 'GAME_FULL'
  | 'GAME_DELETED'
  | 'GAME_IN_PROGRESS';

export const alerts = {
  GAME_DNE: {
    title: 'Invalid Game Code!',
    message: "If you don't have a code go back and start a new game.",
  },
  GAME_FULL: {
    icon: 'lock',
    title: 'Full Game!',
    message: 'The game you are trying to join already has 8 players.',
  },
  GAME_DELETED: {
    icon: 'trash-2',
    title: 'Game Deleted!',
    message: 'This game has been deleted by the host.',
  },
  GAME_IN_PROGRESS: {
    icon: 'trash-2',
    title: 'Game in Progress!',
    message: 'To join a new game you must quit your current game.',
  },
};

export default statusReducer;
