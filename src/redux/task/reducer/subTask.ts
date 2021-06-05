import { TaskState, SubTaskState } from '../../ReduxState';
import {
  ACTION_SUCCESS,
  ACTION_ERROR,
  SubTaskActionType,
  ACTION,
  ACTION_CLEAR
} from '../action/subTask';


//-------------- Actions
const initialState: SubTaskState = {
  response: undefined,
  error: '',
};

export default (
  state = initialState,
  action: SubTaskActionType,
): TaskState => {
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
        response: undefined,
        error: '',
      }

    default:
      return state;
  }
};

