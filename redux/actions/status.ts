import { GameStatus, LoadingStatus } from '../../util/types';
import { AlertCode } from '../reducers/status';
import {
  CLEAR_JOIN_STATUS,
  SET_GAME_STATUS,
  SET_JOIN_STATUS,
  SHOW_ALERT,
  SHOW_CUSTOM_ALERT,
  USER_POPUP,
} from './actionTypes';

export const joinSuccess = () => ({
  type: SET_JOIN_STATUS,
  payload: { status: LoadingStatus.SUCCESS },
});

export const joinFailure = (alertCode: string) => ({
  type: SET_JOIN_STATUS,
  payload: { status: LoadingStatus.FAILED, alertCode },
});

export const joinClear = () => ({
  type: CLEAR_JOIN_STATUS,
  payload: '',
});

export const setGameStatus = (status: GameStatus) => ({
  type: SET_GAME_STATUS,
  payload: { status },
});

export const displayAlert = (alertCode: AlertCode) => ({
  type: SHOW_ALERT,
  payload: alertCode,
});

export const displayCustomAlert = (alertCode: AlertCode, options: any) => ({
  type: SHOW_CUSTOM_ALERT,
  payload: { alertCode, options },
});

export const userPopup = (callback: (name: string) => void) => ({
  type: USER_POPUP,
  payload: callback,
});

export const hideAlert = () => ({
  type: SHOW_ALERT,
  payload: '',
});
