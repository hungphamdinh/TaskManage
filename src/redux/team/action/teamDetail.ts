import { TeamDetail } from '../../../services/model/TeamMember';
import { GetTeamDetailRequest } from '../../../services/model/request/TeamMember';

const ACTION = 'GET_TEAM_DETAIL';
const ACTION_SUCCESS = 'GET_TEAM_DETAIL_SUCCESS';
const ACTION_ERROR = 'GET_TEAM_DETAIL_ERROR';
export interface GetTeamDetailAction {
  type: typeof ACTION;
  params: GetTeamDetailRequest;
}

interface OnSuccessAction {
  type: typeof ACTION_SUCCESS;
  payload: TeamDetail;
}

interface OnFailureAction {
  type: typeof ACTION_ERROR;
  error: string;
}


export type TeamDetailActionType =
  | GetTeamDetailAction
  | OnSuccessAction
  | OnFailureAction

const getTeamDetail = (params: GetTeamDetailRequest): GetTeamDetailAction => ({
  type: ACTION,
  params,
});

const onSuccess = (payload: TeamDetail): OnSuccessAction => ({
  type: ACTION_SUCCESS,
  payload,
});

const onFailure = (error: string): OnFailureAction => ({
  type: ACTION_ERROR,
  error,
});

export {
  ACTION,
  ACTION_SUCCESS,
  ACTION_ERROR,
  getTeamDetail,
  onSuccess,
  onFailure,
  
};
