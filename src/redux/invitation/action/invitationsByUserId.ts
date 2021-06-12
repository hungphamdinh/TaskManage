
import { GetInvitationsByUserIdRequest } from "../../../services/model/request/Invitation";
import { Invitation } from "../../../services/model/Invitation";

const ACTION = 'GET_INVITATION_BY_USER_ID';
const ACTION_SUCCESS = 'GET_INVITATION_BY_USER_ID_SUCCESS';
const ACTION_ERROR = 'GET_INVITATION_BY_USER_ID_ERROR';
const ACTION_CLEAR = 'GET_INVITATION_BY_USER_ID_CLEAR';
export interface GetInvitationByUserIdAction {
  type: typeof ACTION;
  params: GetInvitationsByUserIdRequest;
}

interface OnSuccessAction {
  type: typeof ACTION_SUCCESS;
  payload: Array<Invitation>;
}

interface OnFailureAction {
  type: typeof ACTION_ERROR;
  error: string;
}

interface ClearInvitationAction {
  type: typeof ACTION_CLEAR;
}

export type GetInvitationByUserIdActionType =
  | GetInvitationByUserIdAction
  | OnSuccessAction
  | OnFailureAction
  | ClearInvitationAction;

const getInvitationByUserId = (params: GetInvitationsByUserIdRequest): GetInvitationByUserIdAction => ({
  type: ACTION,
  params,
});

const onSuccess = (payload: Array<Invitation>): OnSuccessAction => ({
  type: ACTION_SUCCESS,
  payload,
});

const onFailure = (error: string): OnFailureAction => ({
  type: ACTION_ERROR,
  error,
});

const clearInvitationSend = (): ClearInvitationAction => ({
  type: ACTION_CLEAR,
})

export {
  getInvitationByUserId,
  onFailure,
  onSuccess,
  clearInvitationSend,
  ACTION,
  ACTION_SUCCESS,
  ACTION_ERROR,
  ACTION_CLEAR,
}