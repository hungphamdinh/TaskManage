/* eslint-disable prettier/prettier */
import { takeEvery, put } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';

import { Colors } from '../../../themes';
import { showIndicator, hideIndicator } from '../../app';
import { strings } from '../../../languages';
import { _saveStorage } from '../../../utilities/Utils';
import TaskAPI from '../../../services/api/TaskAPI';
import { GetSubTaskAction, onSuccess, onFailure, ACTION } from '../action/subTasks';

function* getSubTasks(action: GetSubTaskAction) {
  try {
    //-------------- Request API
    const res = yield TaskAPI.getSubTasks(action.params);
    // console.log(res);
    //-------------- Request API Success
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
  yield takeEvery(ACTION, getSubTasks);
}

function* sleep(time: Number) {
  yield new Promise((resolve) => setTimeout(resolve, time));
}
