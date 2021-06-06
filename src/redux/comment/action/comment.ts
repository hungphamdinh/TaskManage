import { AddCommentRequest } from "../../../services/model/request/Comment";
import { Comment } from "../../../services/model/Comment";

const ACTION = 'ADD_COMMENT';
const ACTION_SUCCESS = 'ADD_COMMENT_SUCCESS';
const ACTION_ERROR = 'ADD_COMMENT_ERROR';
const ACTION_CLEAR = 'ADD_COMMENT_CLEAR'
interface AddCommentAction {
  type: typeof ACTION;
  params: AddCommentRequest;
}

interface OnSuccessAction {
  type: typeof ACTION_SUCCESS;
  payload: any;
}

interface OnFailureAction {
  type: typeof ACTION_ERROR;
  error: string;
}

interface ClearAction {
  type: typeof ACTION_CLEAR;
}

type CommentActionType =
  | AddCommentAction
  | OnSuccessAction
  | ClearAction
  | OnFailureAction;

const addComment = (params: AddCommentRequest): AddCommentAction => ({
  type: ACTION,
  params,
});

const onSuccess = (payload: any): OnSuccessAction => ({
  type: ACTION_SUCCESS,
  payload,
});

const onFailure = (error: string): OnFailureAction => ({
  type: ACTION_ERROR,
  error,
});

const clearComment = (): ClearAction => ({
  type: ACTION_CLEAR,
})
export {
  onFailure,
  onSuccess,
  addComment,
  clearComment,
  AddCommentAction,
  CommentActionType,
  ACTION,
  ACTION_SUCCESS,
  ACTION_ERROR,
  ACTION_CLEAR,
}