import { User } from '../../util/types';
import { SET_USER } from './actionTypes';

export const setUser = (user: User) => ({
  type: SET_USER,
  payload: user,
});
