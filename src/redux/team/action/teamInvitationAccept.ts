
import { AcceptTeamInvitationRequest } from "../../../services/model/request/Invitation";

const ACTION = 'ACCEPT_TEAM_INVITATION';
const ACTION_SUCCESS = 'ACCEPT_TEAM_INVITATION_SUCCESS';
const ACTION_ERROR = 'ACCEPT_TEAM_INVITATION_ERROR';
const ACTION_CLEAR = 'ACCEPT_TEAM_INVITATION_CLEAR';
export interface AcceptTeamInvitationAction {
  type: typeof ACTION;
  params: AcceptTeamInvitationRequest;
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

export type AcceptTeamInvitationActionType =
  | AcceptTeamInvitationAction
  | OnSuccessAction
  | OnFailureAction
  | ClearInvitationAction;

const acceptInvitation = (params: AcceptTeamInvitationRequest): AcceptTeamInvitationAction => ({
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