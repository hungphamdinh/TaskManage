/* eslint-disable prettier/prettier */
import { takeEvery, put } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';

import { Colors } from '../../../themes';
import { ACTION, GetMembersAction, onSuccess, onFailure } from '../action/members';
import { showIndicator, hideIndicator } from '../../app';
import { strings } from '../../../languages';
import { _saveStorage } from '../../../utilities/Utils';
import MemberAPI from '../../../services/api/MemberAPI';

function* getMembers(action: GetMembersAction) {
  try {
    //-------------- Request API
    yield put(showIndicator(Colors.overlay5));
    yield sleep(1000);
    const res = yield MemberAPI.getMembers(
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
  yield takeEvery(ACTION, getMembers);
}

function* sleep(time: Number) {
  yield new Promise((resolve) => setTimeout(resolve, time));
}
