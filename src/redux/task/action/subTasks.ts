import { GetTasksRequest, AddTaskRequest, AddSubTaskRequest, GetSubTaskRequest } from '../../../services/model/request/Task';
import { Task, SubTask } from '../../../services/model/Task';

const ACTION = 'GET_SUB_TASKS';
const ACTION_SUCCESS = 'GET_SUB_TASKS_SUCCESS';
const ACTION_ERROR = 'GET_SUB_TASKS_ERROR';
const ACTION_CLEAR = 'GET_SUB_TASKS_CLEAR_SUB_TASK';
export interface GetSubTaskAction {
  type: typeof ACTION;
  params: GetSubTaskRequest;
}

interface OnSuccessAction {
  type: typeof ACTION_SUCCESS;
  payload: Array<SubTask>;
}

interface OnFailureAction {
  type: typeof ACTION_ERROR;
  error: string;
}

interface ClearAddSubTaskResponse {
  type: typeof ACTION_CLEAR
}

export type SubTasksActionType =
  | GetSubTaskAction
  | OnSuccessAction
  | ClearAddSubTaskResponse
  | OnFailureAction;


const getSubTask = (params: GetSubTaskRequest): GetSubTaskAction => ({
  type: ACTION,
  params,
});

const onSuccess = (payload: Array<SubTask>): OnSuccessAction => ({
  type: ACTION_SUCCESS,
  payload,
});

const onFailure = (error: string): OnFailureAction => ({
  type: ACTION_ERROR,
  error,
});

const clearSubTasks = (): ClearAddSubTaskResponse => ({
  type: ACTION_CLEAR,
})
export {
  ACTION,
  ACTION_SUCCESS,
  ACTION_ERROR,
  ACTION_CLEAR,
  getSubTask,
  onSuccess,
  onFailure,
  clearSubTasks,
};
