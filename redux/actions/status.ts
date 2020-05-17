import { GameStatus, LoadingStatus } from '../../util/types';
import { SET_GAME_STATUS, SET_JOIN_STATUS } from './actionTypes';

export const joinSuccess = () => ({
  type: SET_JOIN_STATUS,
  payload: { status: LoadingStatus.SUCCESS },
});

export const joinFailure = (errCode: string) => ({
  type: SET_JOIN_STATUS,
  payload: { status: LoadingStatus.FAILED, errCode },
});

export const joinClear = () => ({
  type: SET_JOIN_STATUS,
  payload: { status: LoadingStatus.LOADING },
});

export const setGameStatus = (status: GameStatus) => ({
  type: SET_GAME_STATUS,
  payload: { status },
});
