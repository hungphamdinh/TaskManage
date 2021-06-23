
import { PostProfilePicRequest } from "../../../services/model/request/TeamMember";

const ACTION = 'UPDATE_TEAM_PROFILE';
const ACTION_SUCCESS = 'UPDATE_TEAM_PROFILE_SUCCESS';
const ACTION_ERROR = 'UPDATE_TEAM_PROFILE_ERROR';
const ACTION_CLEAR = 'UPDATE_TEAM_PROFILE_CLEAR';
export interface PostTeamProfilePicAction {
  type: typeof ACTION;
  params: PostProfilePicRequest;
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

export type TeamProfileActionType =
  | PostTeamProfilePicAction
  | OnSuccessAction
  | OnFailureAction
  | ClearTeamMemberAction;

const postTeamProfilePic = (params: PostProfilePicRequest): PostTeamProfilePicAction => ({
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
  postTeamProfilePic,
  onFailure,
  onSuccess,
  clearTeamMember,
  ACTION,
  ACTION_SUCCESS,
  ACTION_ERROR,
  ACTION_CLEAR,
}