import { TaskState } from '../../ReduxState';
import {
  ACTION_SUCCESS,
  ACTION_ERROR,
  TaskActionType,
  ACTION_CLEAR,
  ACTION,
} from '../action/task';


//-------------- Actions
const initialState: TaskState = {
  response: undefined,
  error: '',
};

export default (
  state = initialState,
  action: TaskActionType,
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
        error: '',
        response: undefined,
      };

    default:
      return state;
  }
};

