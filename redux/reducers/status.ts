import { GameStatus, LoadingStatus, Status } from '../../util/types';
import { SET_JOIN_STATUS, SET_GAME_STATUS } from '../actions/actionTypes';

const initialState: Status = {
  join: { status: LoadingStatus.LOADING, errCode: '' },
  game: { status: GameStatus.LOBBY },
};

const statusReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_JOIN_STATUS:
      return { ...state, join: action.payload };
    case SET_GAME_STATUS:
      return { ...state, game: action.payload };
    default:
      return state;
  }
};

export const errors = {
  GAME_DNE: {
    title: 'Invalid Game Code!',
    message: "If you don't have a code go back and start a new game.",
  },
  GAME_FULL: {
    title: 'Full Game!',
    message: 'The game you are trying to join already has 8 players.',
  },
  GAME_DELETED: {
    title: 'Game Deleted!',
    message: 'This game has been deleted by the host.',
  },
};

export default statusReducer;
