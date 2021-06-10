/* eslint-disable prettier/prettier */
import { combineReducers } from 'redux';
import user from './user/reducer/user';
import app from './app/index';
import tasks from './task/reducer/tasks';
import taskDetail from './task/reducer/taskDetail';
import task from './task/reducer/task';
import subTask from './task/reducer/subTask';
import subTaskStatus from './task/reducer/subTaskStatus';
import members from './member/reducer/members';
import comment from './comment/reducer/comment';
import comments from './comment/reducer/comments';
import subTasks from './task/reducer/subTasks';
const rootReducer = combineReducers({
  user,
  tasks,
  task,
  members,
  app,
  taskDetail,
  subTask,
  subTaskStatus,
  comment,
  comments,
  subTasks
});

export default rootReducer;
