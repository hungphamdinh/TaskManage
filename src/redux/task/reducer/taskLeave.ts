import { TaskState, TaskLeaveState } from '../../ReduxState';
import {
  ACTION_SUCCESS,
  ACTION_ERROR,
  TaskLeaveActionType,
  ACTION_CLEAR,
  ACTION,
} from '../action/taskLeave';


//-------------- Actions
const initialState: TaskLeaveState = {
  response: undefined,
  error: '',
};

export default (
  state = initialState,
  action: TaskLeaveActionType,
): TaskLeaveState => {
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

    default:
      return state;
  }
};

