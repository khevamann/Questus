import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';

import { GameData, User } from '../../util/types';
import gameData from './gameData';
import user from './user';

export const rootReducer = combineReducers({
  firestoreReducer,
  gameData,
  user,
});

export type RootState = {
  firestoreReducer: any;
  gameData: GameData;
  user: User;
};
