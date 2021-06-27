import { takeEvery, put } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';
import { ACTION, DeleteTeamMemberAction, onSuccess, onFailure } from '../action/teamMemberDelete';
import { hideIndicator, showIndicator } from '../../app';
import { strings } from '../../../languages';
import { _saveStorage } from '../../../utilities/Utils';
import { Response } from '../../../services/model/Response';
import { Colors } from '../../../themes';
import TeamMemberAPI from '../../../services/api/TeamMemberAPI';

function* deleteTeamMember(action: DeleteTeamMemberAction) {
  try {
    //-------------- Request API
    yield put(showIndicator(Colors.overlay5));
    const res: Response = yield TeamMemberAPI.deleteTeamMember(
      action.params
    );
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
  yield takeEvery(ACTION, deleteTeamMember);
}


