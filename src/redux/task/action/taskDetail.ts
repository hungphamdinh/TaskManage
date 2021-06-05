import { GetTaskDetailRequest } from '../../../services/model/request/Task';
import { TaskDetail } from '../../../services/model/Task';

const ACTION = 'GET_DETAIL_TASK';
const ACTION_SUCCESS = 'GET_DETAIL_TASK_SUCCESS';
const ACTION_ERROR = 'GET_DETAIL_TASK_ERROR';
export interface GetDetailTaskAction {
  type: typeof ACTION;
  params: GetTaskDetailRequest;
}

interface OnSuccessAction {
  type: typeof ACTION_SUCCESS;
  payload: TaskDetail;
}

interface OnFailureAction {
  type: typeof ACTION_ERROR;
  error: string;
}


export type TaskDetailActionType =
  | GetDetailTaskAction
  | OnSuccessAction
  | OnFailureAction

const getTaskDetail = (params: GetTaskDetailRequest): GetDetailTaskAction => ({
  type: ACTION,
  params,
});

const onSuccess = (payload: TaskDetail): OnSuccessAction => ({
  type: ACTION_SUCCESS,
  payload,
});

const onFailure = (error: string): OnFailureAction => ({
  type: ACTION_ERROR,
  error,
});

export {
  ACTION,
  ACTION_SUCCESS,
  ACTION_ERROR,
  getTaskDetail,
  onSuccess,
  onFailure,
  
};
