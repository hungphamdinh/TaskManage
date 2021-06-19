import { LeaveTaskRequest } from '../../../services/model/request/Task';

const ACTION = 'LEAVE_TASK';
const ACTION_SUCCESS = 'LEAVE_TASK_SUCCESS';
const ACTION_ERROR = 'LEAVE_TASK_ERROR';
const ACTION_CLEAR = 'LEAVE_TASK_CLEAR';

export interface LeaveTaskAction {
  type: typeof ACTION;
  params: LeaveTaskRequest;
}

interface OnSuccessAction {
  type: typeof ACTION_SUCCESS;
  payload: any;
}

interface OnFailureAction {
  type: typeof ACTION_ERROR;
  error: string;
}

interface ClearAction {
  type: typeof ACTION_CLEAR;
}


export type TaskLeaveActionType =
  | LeaveTaskAction
  | OnSuccessAction
  | OnFailureAction
  | ClearAction;


const leaveTask = (params: LeaveTaskRequest): LeaveTaskAction => ({
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

const clear = () => ({
  type: ACTION_CLEAR,
});
export {
  ACTION,
  ACTION_SUCCESS,
  ACTION_ERROR,
  ACTION_CLEAR,
  leaveTask,
  onSuccess,
  onFailure,
  clear,
};
