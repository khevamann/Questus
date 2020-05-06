import { combineReducers } from 'redux';

import gameData from './gameData';

export const rootReducer = combineReducers({
  gameData,
});

export type RootState = ReturnType<typeof rootReducer>;
