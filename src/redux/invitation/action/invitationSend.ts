
import { SendInvitationToTaskTaskRequest } from "../../../services/model/request/Invitation";

const ACTION = 'SEND_INVITATION';
const ACTION_SUCCESS = 'SEND_INVITATION_SUCCESS';
const ACTION_ERROR = 'SEND_INVITATION_ERROR';
const ACTION_CLEAR = 'SEND_INVITATION_CLEAR';
export interface SendInvitationAction {
  type: typeof ACTION;
  params: SendInvitationToTaskTaskRequest;
}

interface OnSuccessAction {
  type: typeof ACTION_SUCCESS;
  payload: any;
}

interface OnFailureAction {
  type: typeof ACTION_ERROR;
  error: string;
}

interface ClearInvitationAction {
  type: typeof ACTION_CLEAR;
}

export type SendInvitationActionType =
  | SendInvitationAction
  | OnSuccessAction
  | OnFailureAction
  | ClearInvitationAction;

const sendInvitation = (params: SendInvitationToTaskTaskRequest): SendInvitationAction => ({
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

const clearInvitationSend = (): ClearInvitationAction => ({
  type: ACTION_CLEAR,
})

export {
  sendInvitation,
  onFailure,
  onSuccess,
  clearInvitationSend,
  ACTION,
  ACTION_SUCCESS,
  ACTION_ERROR,
  ACTION_CLEAR,
}