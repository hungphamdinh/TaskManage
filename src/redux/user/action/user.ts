/* eslint-disable no-undef */
import {
  LoginRequest, UpdateRoleRequest,
} from '../../../services/model/request/User';
import { User } from '../../../services/model/User';

const ACTION = 'LOGIN_WITH_EMAIL';
const ACTION_SUCCESS = 'LOGIN_WITH_EMAIL_SUCCESS';
const ACTION_ERROR = 'LOGIN_WITH_EMAIL_ERROR';
const ACTION_LOGOUT = 'ACTION_LOGOUT';
const ACTION_CLEAR_ERROR = 'ACTION_CLEAR_ERROR';
const ACTION_UPDATE_ROLE = 'LOGIN_WITH_EMAIL_USER_UPDATE_ROLE';
interface loginWithEmailAction {
  type: typeof ACTION;
  params: LoginRequest;
}

interface UpdateRoleAction {
  type: typeof ACTION_UPDATE_ROLE;
  params: UpdateRoleRequest;
}
interface onSuccessAction {
  type: typeof ACTION_SUCCESS;
  payload: User;
  isRegister?: boolean;
}

interface onFailureAction {
  type: typeof ACTION_ERROR;
  error: string;
}

interface onLogoutAction {
  type: typeof ACTION_LOGOUT;
}

interface clearErrorAction {
  type: typeof ACTION_CLEAR_ERROR;
}


type loginWithEmailActionType =
  | loginWithEmailAction
  | onSuccessAction
  | onFailureAction
  | UpdateRoleAction
  | onLogoutAction
  | clearErrorAction;

export {
  ACTION,
  ACTION_SUCCESS,
  ACTION_UPDATE_ROLE,
  ACTION_ERROR,
  ACTION_LOGOUT,
  ACTION_CLEAR_ERROR,
  loginWithEmailAction,
  onSuccessAction,
  onFailureAction,
  UpdateRoleAction,
  loginWithEmailActionType,
};
