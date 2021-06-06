import { GetCommentsRequest } from "../../../services/model/request/Comment";
import { Comment } from "../../../services/model/Comment";

const ACTION = 'GET_COMMENTS';
const ACTION_SUCCESS = 'GET_COMMENTS_SUCCESS';
const ACTION_ERROR = 'GET_COMMENTS_ERROR';
const ACTION_CLEAR = 'GET_COMMENTS_CLEAR';
interface GetCommentsAction {
  type: typeof ACTION;
  params: GetCommentsRequest;
}

interface OnSuccessAction {
  type: typeof ACTION_SUCCESS;
  payload: Array<Comment>;
}

interface OnFailureAction {
  type: typeof ACTION_ERROR;
  error: string;
}

interface ClearAction {
  type: typeof ACTION_CLEAR;
}

type CommentsActionType =
  | GetCommentsAction
  | OnSuccessAction
  | ClearAction
  | OnFailureAction;

const getComments = (params: GetCommentsRequest): GetCommentsAction => ({
  type: ACTION,
  params,
});

const onSuccess = (payload: Array<Comment>): OnSuccessAction => ({
  type: ACTION_SUCCESS,
  payload,
});

const onFailure = (error: string): OnFailureAction => ({
  type: ACTION_ERROR,
  error,
});

const clearComments = () => ({
  type: ACTION_CLEAR
})

export {
  onFailure,
  onSuccess,
  getComments,
  clearComments,
  GetCommentsAction,
  CommentsActionType,
  ACTION,
  ACTION_SUCCESS,
  ACTION_ERROR,
}