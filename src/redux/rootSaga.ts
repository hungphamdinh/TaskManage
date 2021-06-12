/* eslint-disable prettier/prettier */
import { fork, all } from 'redux-saga/effects';

import loginWithEmail from './user/sagas/user';
import getTasksByUserId from './task/sagas/tasks';
import addTask from './task/sagas/task';
import updateTask from './task/sagas/taskUpdate';
import addSubTask from './task/sagas/subTask';
import getTaskDetail from './task/sagas/taskDetail';
import getMembers from './member/sagas/members';
import setDoneSubTask from './task/sagas/subTaskStatus';
import getComments from './comment/sagas/comments';
import addComment from './comment/sagas/comment';
import getSubTasks from './task/sagas/subTasks';
export default function* rootSaga() {
  yield all([
    fork(loginWithEmail),
    fork(getTasksByUserId),
    fork(addTask),
    fork(getMembers),
    fork(getTaskDetail),
    fork(addSubTask),
    fork(setDoneSubTask),
    fork(getComments),
    fork(addComment),
    fork(getSubTasks),
    fork(updateTask),
  ]);
}
