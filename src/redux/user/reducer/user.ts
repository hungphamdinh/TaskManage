import { UserState } from '../../ReduxState';
import {
  ACTION,
  ACTION_SUCCESS,
  ACTION_ERROR,
  ACTION_LOGOUT,
  loginWithEmailAction,
  onSuccessAction,
  onFailureAction,
  loginWithEmailActionType,
  UpdateRoleAction,
  ACTION_UPDATE_ROLE,
  ACTION_CLEAR_ERROR,
} from '../action/user';
import {
  LoginRequest, UpdateRoleRequest,
} from '../../../services/model/request/User';
import { User } from '../../../services/model/User';

const loginWithEmail = (params: LoginRequest): loginWithEmailAction => ({
  type: ACTION,
  params,
});

const updateRole = (params: UpdateRoleRequest): UpdateRoleAction => ({
  type: ACTION_UPDATE_ROLE,
  params,
});

const onSuccess = (payload: User, isRegister?: boolean): onSuccessAction => ({
  type: ACTION_SUCCESS,
  payload,
  isRegister,
});

const onFailure = (error: string): onFailureAction => ({
  type: ACTION_ERROR,
  error,
});

const logout = () => ({
  type: ACTION_LOGOUT,
});

const clearError = () => ({
  type: ACTION_CLEAR_ERROR,
});

//-------------- Actions
const initialState: UserState = {
  user: (undefined as unknown) as User,
  error: '',
};

export default (
  state = initialState,
  action: loginWithEmailActionType,
): UserState => {
  switch (action.type) {
    case ACTION:
      return {
        ...state,
        user: (undefined as unknown) as User,
      };

    case ACTION_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: '',
      };

    case ACTION_ERROR:
      return {
        ...state,
        error: action.error,
      };

    case ACTION_LOGOUT:
      return {
        ...state,
        user: (undefined as unknown) as User,
      };

    case ACTION_CLEAR_ERROR:
      return {
        ...state,
        error: '',
      };

    case ACTION_UPDATE_ROLE:
      return {
        ...state,
      }

    default:
      return state;
  }
};

export {
  // forgotPassword,
  loginWithEmail,
  onFailure,
  onSuccess,
  logout,
  clearError,
  updateRole,
};
