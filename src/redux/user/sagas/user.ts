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
import {Response} from '../../../services/model/Response';
import { ApiResponseStatusCode } from '../../../helpers/Constants';

function* loginWithEmail(action: loginWithEmailAction) {
  try {
    //-------------- Request API
    console.log('action')
    console.log(action)
    yield put(showIndicator(Colors.overlay5));
    // yield sleep(1000);
    const res: Response = yield UserAPI.login(
      action.params
    );
    console.log("res");
    console.log(res);
    //-------------- Request API Success
    yield put(hideIndicator());
    if(res.status == ApiResponseStatusCode.SUCCESS) {
        yield put(onSuccess(res.data));
    }
  } catch (error) {
    //-------------- Request API Failure
      console.log(error);
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
