import { GameItem, PlayerType } from '../../util/types';
import {
  SET_GAME_CODE,
  SET_GAME_ITEMS,
  SET_GAME_OPTS,
  SET_GAME_PLAYERS,
  SET_ITEM_COMPLETE,
} from './actionTypes';

export const setGameType = (gameType: number) => ({
  type: SET_GAME_OPTS,
  payload: gameType,
});

export const setGameCode = (code: string) => ({
  type: SET_GAME_CODE,
  payload: code,
});

export const setGameItems = (items: GameItem[][]) => ({
  type: SET_GAME_ITEMS,
  payload: items,
});

export const setItemComplete = (index: number) => ({
  type: SET_ITEM_COMPLETE,
  payload: index,
});

export const setGamePlayers = (players: PlayerType[]) => ({
  type: SET_GAME_PLAYERS,
  payload: players,
});
