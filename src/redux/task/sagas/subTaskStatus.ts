/* eslint-disable prettier/prettier */
import { takeEvery, put } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';
import { hideIndicator } from '../../app';
import { strings } from '../../../languages';
import { _saveStorage } from '../../../utilities/Utils';
import TaskAPI from '../../../services/api/TaskAPI';
import { DoneSubTaskAction, onSuccess, onFailure, ACTION } from '../action/subTaskStatus';

function* setDoneSubTask(action: DoneSubTaskAction) {
  try {
    //-------------- Request API
    const res = yield TaskAPI.setDoneSubTask(action.params);
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
  yield takeEvery(ACTION, setDoneSubTask);
}


