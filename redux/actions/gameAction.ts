import { SET_GAME_CODE, SET_GAME_OPTS } from './actionTypes';

export const setGameType = (gameType: number) => ({
  type: SET_GAME_OPTS,
  payload: gameType,
});

export const setGameCode = (code: string) => ({
  type: SET_GAME_CODE,
  payload: code,
});
