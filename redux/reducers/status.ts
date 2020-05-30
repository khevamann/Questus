import { GameStatus, LoadingStatus, Status } from '../../util/types';
import {
  SET_JOIN_STATUS,
  SET_GAME_STATUS,
  SHOW_ALERT,
  HIDE_ALERT,
  CLEAR_JOIN_STATUS,
  SHOW_CUSTOM_ALERT,
  USER_POPUP,
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
        alert: alerts[action.payload.alertCode],
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
    case USER_POPUP:
      return {
        ...state,
        alert: { ...alerts['USER_INPUT'], onPress: action.payload },
      };
    case SHOW_CUSTOM_ALERT:
      return {
        ...state,
        alert: {
          ...alerts[action.payload.alertCode],
          ...action.payload.options,
        },
      };
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
  | 'GAME_IN_PROGRESS'
  | 'GAME_OVER_WIN'
  | 'GAME_OVER_LOSE'
  | 'USER_INPUT';

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
    faicon: 'bomb',
    title: 'Game in Progress!',
    btnTxt: 'Leave',
    btnCancel: 'Cancel',
    message:
      'Are you sure you want to exit. You will be removed from this game.',
  },
  GAME_OVER_WIN: {
    faicon: 'crown',
    title: '1st Place! Congrats!',
    message:
      'You know no one had a chance of beating you. See if you can keep up your winning streak',
  },
  GAME_OVER_LOSE: {
    faicon: 'sad-tear',
    title: '',
    message:
      'That means you lose... Maybe next time try to actually look for the items on your list.',
  },
  USER_INPUT: {
    faicon: 'signature',
    title: 'What should we call you?',
    btnTxt: 'Set Name',
    input: 'Nickname',
  },
};

export default statusReducer;
