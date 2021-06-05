import { SetDoneSubTaskRequest } from '../../../services/model/request/Task';
import { SubTaskStatus } from '../../../services/model/Task';

const ACTION = 'DONE_SUB_TASK';
const ACTION_SUCCESS = 'DONE_SUB_TASK_SUCCESS';
const ACTION_ERROR = 'DONE_SUB_TASK_ERROR';
const ACTION_CLEAR = 'ACTION_CLEAR_SUB_TASK_STATUS';
export interface DoneSubTaskAction {
  type: typeof ACTION;
  params: SetDoneSubTaskRequest;
}

interface OnSuccessAction {
  type: typeof ACTION_SUCCESS;
  payload: SubTaskStatus;
}

interface OnFailureAction {
  type: typeof ACTION_ERROR;
  error: string;
}

interface ClearSubTaskAction {
  type: typeof ACTION_CLEAR,
}
export type SubTaskStatusActionType =
  | DoneSubTaskAction
  | OnSuccessAction
  | ClearSubTaskAction
  | OnFailureAction;


const doneSubTask = (params: SetDoneSubTaskRequest): DoneSubTaskAction => ({
  type: ACTION,
  params,
});

const onSuccess = (payload: SubTaskStatus): OnSuccessAction => ({
  type: ACTION_SUCCESS,
  payload,
});

const onFailure = (error: string): OnFailureAction => ({
  type: ACTION_ERROR,
  error,
});

const clearSubTaskStatus = (): ClearSubTaskAction => ({
  type: ACTION_CLEAR,
})
export {
  ACTION,
  ACTION_SUCCESS,
  ACTION_ERROR,
  ACTION_CLEAR,
  doneSubTask,
  onSuccess,
  onFailure,
  clearSubTaskStatus,
};
