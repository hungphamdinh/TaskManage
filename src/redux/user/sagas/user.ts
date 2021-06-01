/* eslint-disable prettier/prettier */
import { takeEvery, put } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';

import { Colors } from '../../../themes';
import { onSuccess, onFailure } from '../reducer/user';
import { ACTION, loginWithEmailAction } from '../action/user';
import { showIndicator, hideIndicator } from '../../app';
import UserAPI from '../../../services/api/UserAPI';
import { strings } from '../../../languages';
import { _saveStorage } from '../../../utilities/Utils';
import {User} from '../../../services/model/User';

function* loginWithEmail(action: loginWithEmailAction) {
  try {
    //-------------- Request API
    // console.log('action')
    // console.log(action)
    yield put(showIndicator(Colors.overlay5));
    yield sleep(1000);
    const res: User = yield UserAPI.login(
      action.params
    );
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
  yield takeEvery(ACTION, loginWithEmail);
}

function* sleep(time: Number) {
  yield new Promise((resolve) => setTimeout(resolve, time));
}
