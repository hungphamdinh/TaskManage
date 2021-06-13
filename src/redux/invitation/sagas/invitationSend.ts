/* eslint-disable prettier/prettier */
import { takeEvery, put } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';
import { ACTION, SendInvitationAction, onSuccess, onFailure } from '../action/invitationSend';
import { hideIndicator, showIndicator } from '../../app';
import { strings } from '../../../languages';
import { _saveStorage } from '../../../utilities/Utils';
import InvitationAPI from '../../../services/api/InvitationAPI';
import { Colors } from '../../../themes';

function* sendInvitation(action: SendInvitationAction) {
  try {
    //-------------- Request API
    yield put(showIndicator(Colors.overlay5));
    const res = yield InvitationAPI.sendInvitation(
      action.params
    );
    //-------------- Request API Success
    yield put(hideIndicator());
    yield put(onSuccess(res));
  } catch (error) {
    //-------------- Request API Failure
    console.log(error);
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
  yield takeEvery(ACTION, sendInvitation);
}














































//CopyRight: PDH 