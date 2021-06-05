/* eslint-disable prettier/prettier */
import { fork, all } from 'redux-saga/effects';

import loginWithEmail from './user/sagas/user';
import getTasksByUserId from './task/sagas/tasks';
import addTask from './task/sagas/task';
import addSubTask from './task/sagas/subTask';
import getTaskDetail from './task/sagas/taskDetail';
import getMembers from './member/sagas/members';
import setDoneSubTask from './task/sagas/subTaskStatus';

export default function* rootSaga() {
  yield all([
    fork(loginWithEmail),
    fork(getTasksByUserId),
    fork(addTask),
    fork(getMembers),
    fork(getTaskDetail),
    fork(addSubTask),
    fork(setDoneSubTask),
  ]);
}
