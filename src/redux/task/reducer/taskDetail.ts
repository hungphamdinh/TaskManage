import { TaskDetailState } from '../../ReduxState';
import {
  ACTION_SUCCESS,
  ACTION_ERROR,
  TaskDetailActionType,
  ACTION,
} from '../action/taskDetail';
import { TaskDetail } from '../../../services/model/Task';


//-------------- Actions
const initialState: TaskDetailState = {
  taskDetail: undefined as unknown as TaskDetail,
  error: '',
};

export default (
  state = initialState,
  action: TaskDetailActionType,
): TaskDetailState => {
  switch (action.type) {
    case ACTION:
      return {
        ...state,
        taskDetail: undefined as unknown as TaskDetail,
      };
    case ACTION_SUCCESS:
      return {
        ...state,
        taskDetail: action.payload,
      };

    case ACTION_ERROR:
      return {
        ...state,
        error: action.error,
      }; 
    default:
      return state;
  }
};

