/* eslint-disable prettier/prettier */
import { combineReducers } from 'redux';
import user from './user/reducer/user';
import tasks from './task/reducer/tasks';
const rootReducer = combineReducers({
  user,
  tasks,
});

export default rootReducer;
