/* eslint-disable prettier/prettier */
import { combineReducers } from 'redux';
import user from './user/reducer/user';
const rootReducer = combineReducers({
  user,
});

export default rootReducer;
