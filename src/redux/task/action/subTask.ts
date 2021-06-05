import { GetTasksRequest, AddTaskRequest, AddSubTaskRequest } from '../../../services/model/request/Task';
import { Task, SubTask } from '../../../services/model/Task';

const ACTION = 'ADD_SUB_TASK';
const ACTION_SUCCESS = 'ADD_SUB_TASK_SUCCESS';
const ACTION_ERROR = 'ADD_SUB_TASK_ERROR';
const ACTION_CLEAR = 'ACTION_CLEAR_SUB_TASK_ERROR';
export interface AddSubTaskAction {
  type: typeof ACTION;
  params: AddSubTaskRequest;
}

interface OnSuccessAction {
  type: typeof ACTION_SUCCESS;
  payload: any;
}

interface OnFailureAction {
  type: typeof ACTION_ERROR;
  error: string;
}

interface ClearAddSubTaskResponse {
  type: typeof ACTION_CLEAR
}

export type SubTaskActionType =
  | AddSubTaskAction
  | OnSuccessAction
  | ClearAddSubTaskResponse
  | OnFailureAction;


const addSubTask = (params: AddSubTaskRequest): AddSubTaskAction => ({
  type: ACTION,
  params,
});

const onSuccess = (payload: any): OnSuccessAction => ({
  type: ACTION_SUCCESS,
  payload,
});

const onFailure = (error: string): OnFailureAction => ({
  type: ACTION_ERROR,
  error,
});

const clearSubTaskResponse = (): ClearAddSubTaskResponse => ({
  type: ACTION_CLEAR,
})
export {
  ACTION,
  ACTION_SUCCESS,
  ACTION_ERROR,
  ACTION_CLEAR,
  addSubTask,
  onSuccess,
  onFailure,
  clearSubTaskResponse,
};
