import {
  GetUsersByIdRequest,
} from '../../../services/model/request/User';
import { User } from '../../../services/model/User';

const ACTION = 'GET_USERS';
const ACTION_SUCCESS = 'GET_USERS_SUCCESS';
const ACTION_ERROR = 'GET_USERS_ERROR';
const ACTION_ADD_USER = 'GET_USERS_ACTION_ADD_USER';
const ACTION_SEARCH_USERS = 'GET_USERS_ACTION_SEARCH_MEMBER';
const ACTION_CLEAR_LOCAL = 'GET_USERS_ACTION_CLEAR_LOCAL';
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

interface ClearUsersLocalAction {
  type: typeof ACTION_CLEAR_LOCAL;
}
type UserByIdActionType =
  | GetUserAction
  | onSuccessAction
  | onFailureAction
  | AddUserAction
  | SearchUsersAction
  | ClearUsersLocalAction

export {
  ACTION,
  ACTION_SUCCESS,
  ACTION_ERROR,
  ACTION_SEARCH_USERS,
  ACTION_CLEAR_LOCAL,
  ACTION_ADD_USER,
  UserByIdActionType,
  onSuccessAction,
  onFailureAction,
  GetUserAction,
  SearchUsersAction,
  ClearUsersLocalAction,
  AddUserAction,
};
