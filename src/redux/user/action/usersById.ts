import {
  GetUsersByIdRequest,
} from '../../../services/model/request/User';
import { User } from '../../../services/model/User';
import { TeamMember } from '../../../services/model/request/TeamMember';

const ACTION = 'GET_USERS';
const ACTION_SUCCESS = 'GET_USERS_SUCCESS';
const ACTION_ERROR = 'GET_USERS_ERROR';
const ACTION_ADD_USER = 'GET_USERS_ACTION_ADD_USER';
const ACTION_SEARCH_USERS = 'GET_USERS_ACTION_SEARCH_MEMBER';
const ACTION_DELETE_USER_LOCAL = 'GET_USERS_ACTION_DELETE_USER_LOCAL';
const ACTION_CLEAR_LOCAL = 'GET_USERS_ACTION_CLEAR_LOCAL';
const ACTION_INITIAL_TEAM_MEMBER = 'GET_USERS_ACTION_INITIAL_TEAM_MEMBER';
interface GetUserAction {
  type: typeof ACTION;
  params: GetUsersByIdRequest;
}

interface onSuccessAction {
  type: typeof ACTION_SUCCESS;
  payload: Array<User>;
}

interface onFailureAction {
  type: typeof ACTION_ERROR;
  error: string;
}

interface AddUserAction {
  type: typeof ACTION_ADD_USER
  user: User;
}

interface SearchUsersAction {
  type: typeof ACTION_SEARCH_USERS;
  name: string;
}

interface DeleteLocalUserAction {
  type: typeof ACTION_DELETE_USER_LOCAL,
  item: User;
}
interface ClearUsersLocalAction {
  type: typeof ACTION_CLEAR_LOCAL;
}

interface InitialMemberLocalAction {
  type: typeof ACTION_INITIAL_TEAM_MEMBER;
  members: Array<TeamMember>;
}
type UserByIdActionType =
  | GetUserAction
  | onSuccessAction
  | onFailureAction
  | AddUserAction
  | SearchUsersAction
  | DeleteLocalUserAction
  | ClearUsersLocalAction
  | InitialMemberLocalAction

export {
  ACTION,
  ACTION_SUCCESS,
  ACTION_ERROR,
  ACTION_SEARCH_USERS,
  ACTION_CLEAR_LOCAL,
  ACTION_ADD_USER,
  ACTION_DELETE_USER_LOCAL,
  ACTION_INITIAL_TEAM_MEMBER,
  UserByIdActionType,
  onSuccessAction,
  onFailureAction,
  GetUserAction,
  SearchUsersAction,
  ClearUsersLocalAction,
  AddUserAction,
  InitialMemberLocalAction,
  DeleteLocalUserAction,
};
