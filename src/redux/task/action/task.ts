import { GetTasksRequest, AddTaskRequest } from '../../../services/model/request/Task';
import { Task } from '../../../services/model/Task';

const ACTION = 'ADD_TASK';
const ACTION_SUCCESS = 'ADD_TASK_SUCCESS';
const ACTION_ERROR = 'ADD_TASK_ERROR';
const ACTION_CLEAR = 'ADD_TASK_CLEAR';
export interface AddTaskAction {
  type: typeof ACTION;
  params: AddTaskRequest;
}

interface OnSuccessAction {
  type: typeof ACTION_SUCCESS;
  payload: Array<Task>;
  isRegister?: boolean;
}

interface OnFailureAction {
  type: typeof ACTION_ERROR;
  error: string;
}

interface ClearAction {
  type: typeof ACTION_CLEAR;
}


export type TaskActionType =
  | AddTaskAction
  | OnSuccessAction
  | OnFailureAction
  | ClearAction;


const addTask = (params: AddTaskRequest): AddTaskAction => ({
  type: ACTION,
  params,
});

const onSuccess = (payload:  Array<Task>): OnSuccessAction => ({
  type: ACTION_SUCCESS,
  payload,
});

const onFailure = (error: string): OnFailureAction => ({
  type: ACTION_ERROR,
  error,
});

const clear = () => ({
  type: ACTION_CLEAR,
});
export {
  ACTION,
  ACTION_SUCCESS,
  ACTION_ERROR,
  ACTION_CLEAR,
  addTask,
  onSuccess,
  onFailure,
  clear,
};
