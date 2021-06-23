/* eslint-disable prettier/prettier */
import { takeEvery, put } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';

import { Colors } from '../../../themes';
import { showIndicator, hideIndicator } from '../../app';
import { strings } from '../../../languages';
import { _saveStorage } from '../../../utilities/Utils';
import { GetTeamDetailAction, onSuccess, onFailure, ACTION } from '../action/teamDetail';
import TeamMemberAPI from '../../../services/api/TeamMemberAPI';

function* getTeamDetail(action: GetTeamDetailAction) {
  try {
    //-------------- Request API
    // console.log(action)
    yield put(showIndicator(Colors.overlay5));
    yield sleep(1000);
    const res = yield TeamMemberAPI.getTeamDetail(action.params);
    console.log(res);
    // console.log(res);
    //-------------- Request API Success
    yield put(hideIndicator());
    yield put(onSuccess(res.data));
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
  yield takeEvery(ACTION, getTeamDetail);
}

function* sleep(time: Number) {
  yield new Promise((resolve) => setTimeout(resolve, time));
}
