
import { RejectInvitationRequest } from "../../../services/model/request/Invitation";

const ACTION = 'REJECT_INVITATION';
const ACTION_SUCCESS = 'REJECT_INVITATION_SUCCESS';
const ACTION_ERROR = 'REJECT_INVITATION_ERROR';
const ACTION_CLEAR = 'REJECT_INVITATION_CLEAR';
export interface RejectInvitationAction {
  type: typeof ACTION;
  params: RejectInvitationRequest;
}

interface OnSuccessAction {
  type: typeof ACTION_SUCCESS;
  payload: any;
}

interface OnFailureAction {
  type: typeof ACTION_ERROR;
  error: string;
}

interface ClearRejectInvitationAction {
  type: typeof ACTION_CLEAR;
}

export type RejectInvitationActionType =
  | RejectInvitationAction
  | OnSuccessAction
  | OnFailureAction
  | ClearRejectInvitationAction;

const rejectInvitation = (params: RejectInvitationRequest): RejectInvitationAction => ({
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

const clearRejectInvitation = (): ClearRejectInvitationAction => ({
  type: ACTION_CLEAR,
})

export {
  rejectInvitation,
  onFailure,
  onSuccess,
  clearRejectInvitation,
  ACTION,
  ACTION_SUCCESS,
  ACTION_ERROR,
  ACTION_CLEAR,
}