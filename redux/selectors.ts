import { RootState } from './reducers';

export const playersSelector = (state: RootState) => state.gameData.players;
export const gameTypeSelector = (state: RootState) => state.gameData.gameType;
export const isHostSelector = (state: RootState) => state.gameData.isHost;
export const gameIdSelector = (state: RootState) => state.gameData.gameId;
export const codeSelector = (state: RootState) => state.gameData.gameCode;
export const itemsSelector = (state: RootState) => state.gameData.items;

export const fireplayers = (state: RootState) => state.firestoreReducer;

export const userSelector = (state: RootState) => state.user;
