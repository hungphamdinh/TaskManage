/* eslint-disable prettier/prettier */
import { fork, all } from 'redux-saga/effects';

import loginWithEmail from './user/sagas/user';
import getTasksByUserId from './task/sagas/tasks';
export default function* rootSaga() {
  yield all([
    fork(loginWithEmail),
    fork(getTasksByUserId),
  ]);
}
