import { Member } from "../../../services/model/Member";
import { TeamMemberByUserId } from "../../../services/model/TeamMember";
import { GetTeamMembersRequest } from "../../../services/model/request/TeamMember";

const ACTION = 'GET_TEAMS_BY_USER_ID';
const ACTION_SUCCESS = 'GET_TEAMS_BY_USER_ID_SUCCESS';
const ACTION_ERROR = 'GET_TEAMS_BY_USER_ID_ERROR';
const ACTION_ADD_MEMBER = 'ADD_MEMBER_GET_TEAMS_BY_USER_ID';
const ACTION_SEARCH_MEMBER = 'SEARCH_MEMBER_GET_TEAMS_BY_USER_ID';
const ACTION_CLEAR_LOCAL = 'CLEAR_LOCAL_GET_TEAMS_BY_USER_ID';
const ACTION_INITIAL_MEMBER = 'GET_TEAMS_BY_USER_ID_INITIAL_MEMBER';
interface GetTeamsAction {
  type: typeof ACTION;
  params: GetTeamMembersRequest;
}
interface InitialMemberAction {
  type: typeof ACTION_INITIAL_MEMBER;
  members: Array<any>;
}

interface onSuccessAction {
  type: typeof ACTION_SUCCESS;
  payload: Array<any>;
  isRegister?: boolean;
}

interface onFailureAction {
  type: typeof ACTION_ERROR;
  error: string;
}

interface AddMemberAction {
  type: typeof ACTION_ADD_MEMBER
  member: Member;
}

interface SearchMemberAction {
  type: typeof ACTION_SEARCH_MEMBER;
  name: string;
}

interface ClearTeamMemberLocalAction {
  type: typeof ACTION_CLEAR_LOCAL;
}
type GetTeamsActionType =
  | GetTeamsAction
  | onSuccessAction
  | AddMemberAction
  | SearchMemberAction
  | ClearTeamMemberLocalAction
  | InitialMemberAction
  | onFailureAction;

const getTeams = (params: GetTeamMembersRequest): GetTeamsActionType => ({
  type: ACTION,
  params,
});

const onSuccess = (payload: Array<TeamMemberByUserId>): onSuccessAction => ({
  type: ACTION_SUCCESS,
  payload,
});

const onFailure = (error: string): onFailureAction => ({
  type: ACTION_ERROR,
  error,
});

const addMember = (member: Member): AddMemberAction => ({
  type: ACTION_ADD_MEMBER,
  member,
})

const searchMember = (name: string): SearchMemberAction => ({
  type: ACTION_SEARCH_MEMBER,
  name,
})

const clearTeamMemberLocal = (): ClearTeamMemberLocalAction => ({
  type: ACTION_CLEAR_LOCAL,
})

const initialMember = (members: Array<TeamMemberByUserId>): InitialMemberAction => ({
  type: ACTION_INITIAL_MEMBER,
  members,
})
export {
  getTeams,
  onFailure,
  onSuccess,
  addMember,
  clearTeamMemberLocal,
  searchMember,
  initialMember,
  GetTeamsAction,
  GetTeamsActionType,
  ACTION,
  ACTION_SUCCESS,
  ACTION_ERROR,
  ACTION_ADD_MEMBER,
  ACTION_SEARCH_MEMBER,
  ACTION_INITIAL_MEMBER,
  ACTION_CLEAR_LOCAL,
}