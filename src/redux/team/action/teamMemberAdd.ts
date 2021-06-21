
import { AddTeamMemberRequest } from "../../../services/model/request/TeamMember";

const ACTION = 'ADD_TEAM_MEMBER';
const ACTION_SUCCESS = 'ADD_TEAM_MEMBER_SUCCESS';
const ACTION_ERROR = 'ADD_TEAM_MEMBER_ERROR';
const ACTION_CLEAR = 'ADD_TEAM_MEMBER_CLEAR';
export interface AddTeamMemberAction {
  type: typeof ACTION;
  params: AddTeamMemberRequest;
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

export type AddTeamMemberActionType =
  | AddTeamMemberAction
  | OnSuccessAction
  | OnFailureAction
  | ClearTeamMemberAction;

const addTeamMember = (params: AddTeamMemberRequest): AddTeamMemberAction => ({
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
  addTeamMember,
  onFailure,
  onSuccess,
  clearTeamMember,
  ACTION,
  ACTION_SUCCESS,
  ACTION_ERROR,
  ACTION_CLEAR,
}