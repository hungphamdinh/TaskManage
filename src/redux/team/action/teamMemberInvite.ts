
import { InviteTeamMemberRequest } from "../../../services/model/request/TeamMember";

const ACTION = 'INVITE_TEAM_MEMBER';
const ACTION_SUCCESS = 'INVITE_TEAM_MEMBER_SUCCESS';
const ACTION_ERROR = 'INVITE_TEAM_MEMBER_ERROR';
const ACTION_CLEAR = 'INVITE_TEAM_MEMBER_CLEAR';
export interface InviteTeamMemberAction {
  type: typeof ACTION;
  params: InviteTeamMemberRequest;
}

interface OnSuccessAction {
  type: typeof ACTION_SUCCESS;
  payload: any;
}

interface OnFailureAction {
  type: typeof ACTION_ERROR;
  error: string;
}

interface ClearTeamMemberAction {
  type: typeof ACTION_CLEAR;
}

export type InviteTeamMemberActionType =
  | InviteTeamMemberAction
  | OnSuccessAction
  | OnFailureAction
  | ClearTeamMemberAction;

const inviteTeamMember = (params: InviteTeamMemberRequest): InviteTeamMemberAction => ({
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

const clearTeamMember = (): ClearTeamMemberAction => ({
  type: ACTION_CLEAR,
})

export {
  inviteTeamMember,
  onFailure,
  onSuccess,
  clearTeamMember,
  ACTION,
  ACTION_SUCCESS,
  ACTION_ERROR,
  ACTION_CLEAR,
}