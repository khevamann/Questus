import { User } from '../../util/types';
import { SET_USER } from '../actions/actionTypes';

const initialState: User = {
  id: '',
  name: '',
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_USER:
      return { ...action.payload };
    default:
      return state;
  }
};
export default userReducer;
