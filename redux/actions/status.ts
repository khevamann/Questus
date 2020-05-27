import { GameStatus, LoadingStatus } from '../../util/types';
import { AlertCode } from '../reducers/status';
import {
  CLEAR_JOIN_STATUS,
  SET_GAME_STATUS,
  SET_JOIN_STATUS,
  SHOW_ALERT,
} from './actionTypes';

export const joinSuccess = () => ({
  type: SET_JOIN_STATUS,
  payload: { status: LoadingStatus.SUCCESS },
});

export const joinFailure = (errCode: string) => ({
  type: SET_JOIN_STATUS,
  payload: { status: LoadingStatus.FAILED, errCode },
});

export const joinClear = () => ({
  type: CLEAR_JOIN_STATUS,
  payload: '',
});

export const setGameStatus = (status: GameStatus) => ({
  type: SET_GAME_STATUS,
  payload: { status },
});

export const displayAlert = (errCode: AlertCode) => ({
  type: SHOW_ALERT,
  payload: errCode,
});

export const hideAlert = () => ({
  type: SHOW_ALERT,
  payload: '',
});
