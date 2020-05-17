import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';

import { GameData, Status, User } from '../../util/types';
import game from './game';
import status from './status';
import user from './user';

export const rootReducer = combineReducers({
  firestore: firestoreReducer,
  game,
  status,
  user,
});

export type RootState = {
  firestore: any;
  game: GameData;
  status: Status;
  user: User;
};
