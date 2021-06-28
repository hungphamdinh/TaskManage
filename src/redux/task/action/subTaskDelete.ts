import { GetTasksRequest, AddTaskRequest, AddSubTaskRequest, DeleteSubTaskRequest } from '../../../services/model/request/Task';
import { Task, SubTask } from '../../../services/model/Task';

const ACTION = 'DELETE_SUB_TASK';
const ACTION_SUCCESS = 'DELETE_SUB_TASK_SUCCESS';
const ACTION_ERROR = 'DELETE_SUB_TASK_ERROR';
const ACTION_CLEAR = 'DELETE_SUB_TASK_ACTION_CLEAR_SUB_TASK_ERROR';
export interface DeleteSubTaskAction {
  type: typeof ACTION;
  params: DeleteSubTaskRequest;
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

export type SubTaskDeleteActionType =
  | DeleteSubTaskAction
  | OnSuccessAction
  | ClearAddSubTaskResponse
  | OnFailureAction;


const deleteSubTask = (params: DeleteSubTaskRequest): DeleteSubTaskAction => ({
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

const clearDeleteSubTaskResponse = (): ClearAddSubTaskResponse => ({
  type: ACTION_CLEAR,
})
export {
  ACTION,
  ACTION_SUCCESS,
  ACTION_ERROR,
  ACTION_CLEAR,
  deleteSubTask,
  onSuccess,
  onFailure,
  clearDeleteSubTaskResponse,
};
