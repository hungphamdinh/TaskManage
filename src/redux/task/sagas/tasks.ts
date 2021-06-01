/* eslint-disable prettier/prettier */
import { takeEvery, put } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';

import { Colors } from '../../../themes';
import { onSuccess, onFailure, ACTION, GetTaskAction } from '../action/tasks';
import { showIndicator, hideIndicator } from '../../app';
import { strings } from '../../../languages';
import { _saveStorage } from '../../../utilities/Utils';
import { Task } from '../../../services/model/Task';
import TaskAPI from '../../../services/api/TaskAPI';

function* getTasksByUserId(action: GetTaskAction) {
  try {
    //-------------- Request API
    // console.log('action')
    console.log(action)
    yield put(showIndicator(Colors.overlay5));
    yield sleep(1000);
    const res: Array<Task> = yield TaskAPI.getTaskByUserId(action.params);
    console.log(res);
    //-------------- Request API Success
    yield put(hideIndicator());
    yield put(onSuccess(res));
  } catch (error) {
    //-------------- Request API Failure
      showMessage({
        message: strings.warning_api.login_failed,
        description: error.message,
        type: 'warning',
      });
    yield put(hideIndicator());
    yield put(onFailure(JSON.stringify(error)));
  }
}

export default function* saga() {
  yield takeEvery(ACTION, getTasksByUserId);
}

function* sleep(time: Number) {
  yield new Promise((resolve) => setTimeout(resolve, time));
}
