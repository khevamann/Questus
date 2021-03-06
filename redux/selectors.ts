import { GameModes } from '../util/types';
import { RootState } from './reducers';

export const playersSelector = (state: RootState) => state.game.players;
export const gameTypeSelector = (state: RootState) => state.game.gameType;
export const gameOverSelector = (state: RootState) => state.game.gameWinner;
export const gameConfigSelector = (state: RootState) => {
  const gt = state.game.gameType;
  return gt < 3 || gt > 12 ? GameModes[`item3`] : GameModes[`item${gt}`];
};
export const isWinnerSelector = (state: RootState) => {
  return state.game.gameWinner === state.user.id;
};
export const isHostSelector = (state: RootState) => {
  return state.game.host === state.user.id;
};
export const codeSelector = (state: RootState) => state.game.gameCode;
export const startSelector = (state: RootState) => state.game.startTime;
export const itemsSelector = (state: RootState) => state.game.items;

export const userSelector = (state: RootState) => state.user;

export const alertSelector = (state: RootState) => state.status.alert;
export const joinStatus = (state: RootState) => state.status.join.status;
export const gameStatus = (state: RootState) => state.status.game.status;
