/* eslint-disable prettier/prettier */
import { takeEvery, put } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';
import { ACTION, GetInvitationByUserIdAction, onSuccess, onFailure } from '../action/invitationsByUserId';
import { hideIndicator, showIndicator } from '../../app';
import { strings } from '../../../languages';
import { _saveStorage } from '../../../utilities/Utils';
import InvitationAPI from '../../../services/api/InvitationAPI';
import { Colors } from '../../../themes';

function* getInvitationsByUserId(action: GetInvitationByUserIdAction) {
  try {
    //-------------- Request API
    yield put(showIndicator(Colors.overlay5));
    const res = yield InvitationAPI.getInvitationByUserId(
      action.params
    );
    //-------------- Request API Success
    yield put(hideIndicator());
    yield put(onSuccess(res));
  } catch (error) {
    //-------------- Request API Failure
      showMessage({
        message: strings.warning_api.check_data,
        description: error.message,
        type: 'warning',
      });
    yield put(hideIndicator());
    yield put(onFailure(JSON.stringify(error)));
  }
}

export default function* saga() {
  yield takeEvery(ACTION, getInvitationsByUserId);
}


