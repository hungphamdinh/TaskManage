
import { AcceptInvitationRequest } from "../../../services/model/request/Invitation";

const ACTION = 'ACCEPT_INVITATION';
const ACTION_SUCCESS = 'ACCEPT_INVITATION_SUCCESS';
const ACTION_ERROR = 'ACCEPT_INVITATION_ERROR';
const ACTION_CLEAR = 'ACCEPT_INVITATION_CLEAR';
export interface AcceptInvitationAction {
  type: typeof ACTION;
  params: AcceptInvitationRequest;
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

export type AcceptInvitationActionType =
  | AcceptInvitationAction
  | OnSuccessAction
  | OnFailureAction
  | ClearInvitationAction;

const acceptInvitation = (params: AcceptInvitationRequest): AcceptInvitationAction => ({
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
  acceptInvitation,
  onFailure,
  onSuccess,
  clearInvitationSend,
  ACTION,
  ACTION_SUCCESS,
  ACTION_ERROR,
  ACTION_CLEAR,
}