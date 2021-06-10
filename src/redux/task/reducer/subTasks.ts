import { TaskState, SubTaskState, SubTasksState } from '../../ReduxState';
import {
  ACTION_SUCCESS,
  ACTION_ERROR,
  SubTasksActionType,
  ACTION,
  ACTION_CLEAR
} from '../action/subTasks';


//-------------- Actions
const initialState: SubTasksState = {
  subTasks: [],
  error: '',
};

export default (
  state = initialState,
  action: SubTasksActionType,
): SubTasksState => {
  switch (action.type) {
    case ACTION:
      return {
        ...state,
        subTasks: [],
      };
    case ACTION_SUCCESS:
      return {
        ...state,
        subTasks: action.payload,
      };

    case ACTION_ERROR:
      return {
        ...state,
        error: action.error,
      };

    case ACTION_CLEAR:
      return {
        ...state,
        subTasks: [],
        error: '',
      }

    default:
      return state;
  }
};

