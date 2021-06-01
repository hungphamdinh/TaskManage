import { TasksState } from '../../ReduxState';
import {
  ACTION_SUCCESS,
  ACTION_ERROR,
  TaskActionType,
  ACTION_CLEAR,
  ACTION,
} from '../action/tasks';


//-------------- Actions
const initialState: TasksState = {
  tasks: [],
  error: '',
};

export default (
  state = initialState,
  action: TaskActionType,
): TasksState => {
  switch (action.type) {
    case ACTION:
      return {
        ...state,
        tasks: [],
      };
    case ACTION_SUCCESS:
      return {
        ...state,
        tasks: action.payload,
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
        tasks: [],
      };

    default:
      return state;
  }
};

