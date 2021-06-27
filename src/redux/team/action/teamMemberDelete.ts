
import { DeleteTeamInvitationRequest } from "../../../services/model/request/Invitation";

const ACTION = 'DELETE_TEAM_MEMBER';
const ACTION_SUCCESS = 'DELETE_TEAM_MEMBER_SUCCESS';
const ACTION_ERROR = 'DELETE_TEAM_MEMBER_ERROR';
const ACTION_CLEAR = 'DELETE_TEAM_MEMBER_CLEAR';
export interface DeleteTeamMemberAction {
  type: typeof ACTION;
  params: DeleteTeamInvitationRequest;
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

export type DeleteTeamMemberActionType =
  | DeleteTeamMemberAction
  | OnSuccessAction
  | OnFailureAction
  | ClearInvitationAction;

const deleteTeamMember = (params: DeleteTeamInvitationRequest): DeleteTeamMemberAction => ({
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

const clearDeleteTeamMember = (): ClearInvitationAction => ({
  type: ACTION_CLEAR,
})

export {
  deleteTeamMember,
  onFailure,
  onSuccess,
  clearDeleteTeamMember,
  ACTION,
  ACTION_SUCCESS,
  ACTION_ERROR,
  ACTION_CLEAR,
}