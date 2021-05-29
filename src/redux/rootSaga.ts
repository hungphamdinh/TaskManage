/* eslint-disable prettier/prettier */
import { fork, all } from 'redux-saga/effects';

import login from './user/sagas/user';
export default function* rootSaga() {
  yield all([
    fork(login),
  ]);
}
