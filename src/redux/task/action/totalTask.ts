import { GetTotalTaskRequest } from '../../../services/model/request/Task';
import { TotalTask } from '../../../services/model/Task';

const ACTION = 'GET_TOTAL_TASK';
const ACTION_SUCCESS = 'GET_TOTAL_TASK_SUCCESS';
const ACTION_ERROR = 'GET_TOTAL_TASK_ERROR';
const ACTION_CLEAR = 'GET_TOTAL_TASK_CLEAR';
export interface GetTotalTaskAction {
  type: typeof ACTION;
  params: GetTotalTaskRequest;
}

interface OnSuccessAction {
  type: typeof ACTION_SUCCESS;
  payload: TotalTask;
}

interface OnFailureAction {
  type: typeof ACTION_ERROR;
  error: string;
}

interface ClearAction {
  type: typeof ACTION_CLEAR;
}


export type TotalTaskActionType =
  | GetTotalTaskAction
  | OnSuccessAction
  | OnFailureAction
  | ClearAction;


const getTotalTask = (params: GetTotalTaskRequest): GetTotalTaskAction => ({
  type: ACTION,
  params,
});

const onSuccess = (payload: TotalTask): OnSuccessAction => ({
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
  getTotalTask,
  onSuccess,
  onFailure,
  clear,
};
