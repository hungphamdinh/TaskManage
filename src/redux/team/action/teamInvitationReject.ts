
import { RejectTeamInvitationRequest } from "../../../services/model/request/TeamMember";

const ACTION = 'REJECT_TEAM_INVITATION';
const ACTION_SUCCESS = 'REJECT_TEAM_INVITATION_SUCCESS';
const ACTION_ERROR = 'REJECT_TEAM_INVITATION_ERROR';
const ACTION_CLEAR = 'REJECT_TEAM_INVITATION_CLEAR';
export interface RejectTeamInvitationAction {
  type: typeof ACTION;
  params: RejectTeamInvitationRequest;
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
  | RejectTeamInvitationAction
  | OnSuccessAction
  | OnFailureAction
  | ClearRejectInvitationAction;

const rejectInvitation = (params: RejectTeamInvitationRequest): RejectTeamInvitationAction => ({
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