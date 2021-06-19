/* eslint-disable prettier/prettier */
import { takeEvery, put } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';
import { ACTION, GetInvitationByUserIdAction, onSuccessReceiver, onSuccessSender, onFailure } from '../action/invitationsByUserId';
import { hideIndicator, showIndicator } from '../../app';
import { strings } from '../../../languages';
import { _saveStorage } from '../../../utilities/Utils';
import InvitationAPI from '../../../services/api/InvitationAPI';
import { Colors } from '../../../themes';
import { Response } from '../../../services/model/Response';
import { ApiResponseStatusCode, InvitationsType } from '../../../helpers/Constants';

function* getInvitationsByUserId(action: GetInvitationByUserIdAction) {
  try {
    //-------------- Request API
    yield put(showIndicator(Colors.overlay5));
    const res: Response = yield InvitationAPI.getInvitationByUserId(
      action.params
    );
    //-------------- Request API Success
    yield put(hideIndicator());
    if(res.status === ApiResponseStatusCode.SUCCESS) {
      if(res.type == 'Receiver') {
        yield put(onSuccessReceiver(res.data))
      }
      else {
        yield put(onSuccessSender(res.data))
      }
    }
    else {
      showMessage({
        message: strings.warning_api.check_data,
        description: res.message,
        type: 'warning',
      });
    yield put(onFailure(JSON.stringify(res)));  
    }
  } catch (error) {
    console.log(error);
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


