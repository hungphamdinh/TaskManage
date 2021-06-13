import { UsersByIdState } from '../../ReduxState';
import {
  ACTION,
  ACTION_SUCCESS,
  ACTION_ERROR,
  onSuccessAction,
  UserByIdActionType,
  onFailureAction,
  GetUserAction,
  ACTION_ADD_USER,
  ACTION_CLEAR_LOCAL,
  ACTION_SEARCH_USERS,
  SearchUsersAction,
  AddUserAction,
  ClearUsersLocalAction
} from '../action/usersById';
import {
  GetUsersByIdRequest,
} from '../../../services/model/request/User';
import { User } from '../../../services/model/User';

const getUsers = (params: GetUsersByIdRequest): GetUserAction => ({
  type: ACTION,
  params,
});

const onSuccess = (payload: Array<User>): onSuccessAction => ({
  type: ACTION_SUCCESS,
  payload,
});

const onFailure = (error: any): onFailureAction => ({
  type: ACTION_ERROR,
  error,
});

const searchUsers = (name: string): SearchUsersAction => ({
  type: ACTION_SEARCH_USERS,
  name,
})

const addUser = (user: User): AddUserAction => ({
  type: ACTION_ADD_USER,
  user,
})

const clearLocalUser = (): ClearUsersLocalAction => ({
  type: ACTION_CLEAR_LOCAL,
})
//-------------- Actions
const initialState: UsersByIdState = {
  users: [],
  usersLocal: [],
  error: '',
};

export default (
  state = initialState,
  action: UserByIdActionType,
): UsersByIdState => {
  switch (action.type) {
    case ACTION:
      return {
        ...state,
        users: [],
      };

    case ACTION_SUCCESS:
      return {
        ...state,
        users: action.payload,
        error: '',
      };

    case ACTION_ERROR:
      return {
        ...state,
        error: action.error,
      };

      case ACTION_SEARCH_USERS:
        return {
          ...state,
          usersLocal: findItemData(action.name, state.users)
        }
  
  
      case ACTION_ADD_USER:
        return {
          ...state,
          usersLocal: checkMember(state.users, action.user)
        }
  
      case ACTION_CLEAR_LOCAL:
        return {
          ...state,
          usersLocal: [],
          users: setIsActive(state.users),
        }
  

    default:
      return state;
  }
};

export {
  onFailure,
  onSuccess,
  getUsers,
  searchUsers,
  addUser,
  clearLocalUser,
};
const setIsActive = (arr: Array<any>) => {
  const data: Array<any> = arr.map((item: any) => {
    item.isActive = false;
    return item;
  });
  return data;
}

const checkMember = (arr: Array<User>, member: User) => {
  const data = arr.map((item: User) => {
    if(item.id === member.id) {
      item.isActive = !item.isActive
    }
    return item;
  })
  return data;
}
function escapeRegExp(str: string) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

function findItemData(queryItem: string, array: any): Array<User> {
  if (array !== undefined || array.length > 0) {
    if (queryItem === '') {
      return [];
    }
    var regEscape = escapeRegExp(queryItem);
    const regex = new RegExp(`${regEscape.trim()}`, 'i');
    return array.filter((item: User) => item.name.search(regex) >= 0);
  }
  return [];
}
