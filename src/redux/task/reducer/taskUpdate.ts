import { TaskUpdateState } from '../../ReduxState';
import {
  ACTION_SUCCESS,
  ACTION_ERROR,
  TaskUpdateActionType,
  ACTION_CLEAR,
  ACTION,
  ACTION_ADD_MEMBER,
  ACTION_INITIAL_MEMBER,
} from '../action/taskUpdate';


//-------------- Actions
const initialState: TaskUpdateState = {
  response: undefined,
  membersLocal: [],
  error: '',
};

export default (
  state = initialState,
  action: TaskUpdateActionType,
): TaskUpdateState => {
  switch (action.type) {
    case ACTION:
      return {
        ...state,
        response: undefined,
      };
    case ACTION_SUCCESS:
      return {
        ...state,
        response: action.payload,
      };

    case ACTION_ERROR:
      return {
        ...state,
        error: action.error,
      };

    case ACTION_CLEAR:
      return {
        ...state,
        error: '',
        response: undefined,
      };

    case ACTION_ADD_MEMBER:
      return {
        ...state,
        membersLocal: state.membersLocal.concat(action.member),
      }
    
    case ACTION_INITIAL_MEMBER:
      return {
        ...state,
        membersLocal: action.members,
      }
    default:
      return state;
  }
};

