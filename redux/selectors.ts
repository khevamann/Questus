import { RootState } from './reducers';

export const playersSelector = (state: RootState) => state.gameData.players;

export const gameTypeSelector = (state: RootState) => state.gameData.gameType;

export const codeSelector = (state: RootState) => state.gameData.gameCode;
