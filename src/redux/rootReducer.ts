/* eslint-disable prettier/prettier */
import { combineReducers } from 'redux';
import user from './user/reducer/user';
import tasks from './task/reducer/tasks';
import task from './task/reducer/task';
import members from './member/reducer/members';
const rootReducer = combineReducers({
  user,
  tasks,
  task,
  members,
});

export default rootReducer;
