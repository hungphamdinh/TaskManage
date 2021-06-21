
import { UpdateTeamMemberRequest } from "../../../services/model/request/TeamMember";

const ACTION = 'UPDATE_TEAM_MEMBER';
const ACTION_SUCCESS = 'UPDATE_TEAM_MEMBER_SUCCESS';
const ACTION_ERROR = 'UPDATE_TEAM_MEMBER_ERROR';
const ACTION_CLEAR = 'UPDATE_TEAM_MEMBER_CLEAR';
export interface UpdateTeamMemberAction {
  type: typeof ACTION;
  params: UpdateTeamMemberRequest;
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

export type TeamMemberUpdateActionType =
  | UpdateTeamMemberAction
  | OnSuccessAction
  | OnFailureAction
  | ClearTeamMemberAction;

const updateTeamMember = (params: UpdateTeamMemberRequest): UpdateTeamMemberAction => ({
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
  updateTeamMember,
  onFailure,
  onSuccess,
  clearTeamMember,
  ACTION,
  ACTION_SUCCESS,
  ACTION_ERROR,
  ACTION_CLEAR,
}