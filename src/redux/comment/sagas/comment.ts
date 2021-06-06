/* eslint-disable prettier/prettier */
import { takeEvery, put } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';

import { Colors } from '../../../themes';
import { ACTION, AddCommentAction, onSuccess, onFailure } from '../action/comment';
import { showIndicator, hideIndicator } from '../../app';
import { strings } from '../../../languages';
import { _saveStorage } from '../../../utilities/Utils';
import CommentAPI from '../../../services/api/CommentAPI';
import { ApiResponseStatusCode } from '../../../helpers/Constants';

function* addComment(action: AddCommentAction) {
  try {
    //-------------- Request API
    yield put(showIndicator(Colors.overlay5));
    yield sleep(1000);
    const res = yield CommentAPI.addComment(
      action.params
    );
    //-------------- Request API Success
    yield put(hideIndicator());
    if(res.statusCode === ApiResponseStatusCode.SUCCESS) {
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
  yield takeEvery(ACTION, addComment);
}

function* sleep(time: Number) {
  yield new Promise((resolve) => setTimeout(resolve, time));
}
