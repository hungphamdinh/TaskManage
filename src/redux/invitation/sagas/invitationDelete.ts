import { takeEvery, put } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';
import { ACTION, DeleteInvitationAction, onSuccess, onFailure } from '../action/invitationDelete';
import { hideIndicator, showIndicator } from '../../app';
import { strings } from '../../../languages';
import { _saveStorage } from '../../../utilities/Utils';
import InvitationAPI from '../../../services/api/InvitationAPI';
import { Response } from '../../../services/model/Response';
import { ApiResponseStatusCode } from '../../../helpers/Constants';
import { Colors } from '../../../themes';

function* deleteInvitation(action: DeleteInvitationAction) {
  try {
    //-------------- Request API
    yield put(showIndicator(Colors.overlay5));
    const res: Response = yield InvitationAPI.deleteInvitation(
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
    yield put(onFailure(JSON.stringify(res.message)));
    }
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
  yield takeEvery(ACTION, deleteInvitation);
}


