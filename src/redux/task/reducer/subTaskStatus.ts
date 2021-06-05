import { TaskState, SubTaskState, SubTaskStatusState } from '../../ReduxState';
import {
  ACTION_SUCCESS,
  ACTION_ERROR,
  SubTaskStatusActionType,
  ACTION,
  ACTION_CLEAR
} from '../action/subTaskStatus';


//-------------- Actions
const initialState: SubTaskStatusState = {
  subTaskResponse: undefined as any,
  error: '',
};

export default (
  state = initialState,
  action: SubTaskStatusActionType,
): SubTaskStatusState => {
  switch (action.type) {
    case ACTION:
      return {
        ...state,
        subTaskResponse: undefined as any,
      };
    case ACTION_SUCCESS:
      return {
        ...state,
        subTaskResponse: action.payload,
      };

    case ACTION_ERROR:
      return {
        ...state,
        error: action.error,
      };

    case ACTION_CLEAR:
      return {
        ...state,
        subTaskResponse: undefined as any,
        error: ''
      }
    default:
      return state;
  }
};

