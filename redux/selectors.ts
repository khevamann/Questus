import { GameModes } from '../util/types';
import { RootState } from './reducers';

export const playersSelector = (state: RootState) => state.gameData.players;
export const gameTypeSelector = (state: RootState) => state.gameData.gameType;
export const gameConfigSelector = (state: RootState) => {
  const gt = state.gameData.gameType;
  return gt < 3 || gt > 12 ? GameModes[`item3`] : GameModes[`item${gt}`];
};
export const isHostSelector = (state: RootState) => {
  return state.gameData.host === state.user.id;
};
export const codeSelector = (state: RootState) => state.gameData.gameCode;
export const itemsSelector = (state: RootState) => state.gameData.items;

export const userSelector = (state: RootState) => state.user;
