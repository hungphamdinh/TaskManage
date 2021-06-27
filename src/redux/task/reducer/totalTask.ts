import { TaskState, TotalTaskState } from '../../ReduxState';
import {
  ACTION_SUCCESS,
  ACTION_ERROR,
  TotalTaskActionType,
  ACTION_CLEAR,
  ACTION,
} from '../action/totalTask';
import { TotalTask } from '../../../services/model/Task';


//-------------- Actions
const initialState: TotalTaskState = {
  totalTask: undefined as unknown  as TotalTask,
  error: '',
};

export default (
  state = initialState,
  action: TotalTaskActionType,
): TotalTaskState => {
  switch (action.type) {
    case ACTION:
      return {
        ...state,
        totalTask: undefined as any,
      };
    case ACTION_SUCCESS:
      return {
        ...state,
        totalTask: action.payload,
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
        totalTask: undefined as any,
      };

    default:
      return state;
  }
};

