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
import { Response } from '../../../services/model/Response';
import { ApiResponseStatusCode } from '../../../helpers/Constants';

function* getTasksByUserId(action: GetTaskAction) {
  try {
    //-------------- Request API
    // console.log('action')
    yield put(showIndicator(Colors.overlay5));
    yield sleep(1000);
    const res: Response = yield TaskAPI.getTaskByUserId(action.params);
    yield put(hideIndicator());
    if(res.status === ApiResponseStatusCode.SUCCESS) {
      yield put(onSuccess(res.data));
    }
    else {
      showMessage({
        message: strings.warning_api.login_failed,
        description: res.message,
        type: 'warning',
      });
      yield put(onFailure(JSON.stringify(res)));

    }
    //-------------- Request API Success
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
