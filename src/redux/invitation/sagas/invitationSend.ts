/* eslint-disable prettier/prettier */
import { takeEvery, put } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';
import { ACTION, SendInvitationAction, onSuccess, onFailure } from '../action/invitationSend';
import { hideIndicator, showIndicator } from '../../app';
import { strings } from '../../../languages';
import { _saveStorage } from '../../../utilities/Utils';
import InvitationAPI from '../../../services/api/InvitationAPI';
import { Colors } from '../../../themes';
import { Response } from '../../../services/model/Response';
import { ApiResponseStatusCode } from '../../../helpers/Constants';

function* sendInvitation(action: SendInvitationAction) {
  try {
    //-------------- Request API
    console.log(action.params);
    yield put(showIndicator(Colors.overlay5));
    const res: Response = yield InvitationAPI.sendInvitation(
      action.params
    );
    yield put(hideIndicator());
    if(res.status === ApiResponseStatusCode.SUCCESS) {
      yield put(onSuccess(res));
    }
    else {
      showMessage({
        message: strings.warning_api.check_data,
        description: res.message,
        type: 'warning',
      });
    yield put(onFailure(JSON.stringify(res)));
    }
    //-------------- Request API Success
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














































//CopyRight: Pham Dinh Hưng