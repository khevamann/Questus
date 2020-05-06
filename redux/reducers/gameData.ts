import { TEST_PLAYERS } from '../../providers/dataservice';
import { GameData } from '../../util/types';
import { SET_GAME_CODE, SET_GAME_OPTS } from '../actions/actionTypes';

const initialState: GameData = {
  players: TEST_PLAYERS,
  gameType: 3,
  gameCode: '',
};
const gameReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_GAME_OPTS:
      return { ...state, gameType: action.payload };
    case SET_GAME_CODE:
      return { ...state, gameCode: action.payload };
    default:
      return state;
  }
};
export default gameReducer;
