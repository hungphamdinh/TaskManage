/* eslint-disable no-undef */
import { GetTasksRequest } from '../../../services/model/request/Task';
import { Task } from '../../../services/model/Task';

const ACTION = 'GET_TASKS';
const ACTION_SUCCESS = 'GET_TASKS_SUCCESS';
const ACTION_ERROR = 'GET_TASKS_ERROR';
const ACTION_CLEAR = 'GET_TASKS_CLEAR';
export interface GetTaskAction {
  type: typeof ACTION;
  params: GetTasksRequest;
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
  | GetTaskAction
  | OnSuccessAction
  | OnFailureAction
  | ClearAction;


const getTasksByUserId = (params: GetTasksRequest): GetTaskAction => ({
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
  getTasksByUserId,
  onSuccess,
  onFailure,
  clear,
};
