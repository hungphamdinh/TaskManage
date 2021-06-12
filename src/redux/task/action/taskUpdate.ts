import { UpdateTaskRequest } from '../../../services/model/request/Task';
import { Member } from '../../../services/model/Member';

const ACTION = 'UPDATE_TASK';
const ACTION_SUCCESS = 'UPDATE_TASK_SUCCESS';
const ACTION_ERROR = 'UPDATE_TASK_ERROR';
const ACTION_CLEAR = 'UPDATE_TASK_CLEAR';
const ACTION_ADD_MEMBER = 'UPDATE_TASK_ADD_MEMBER';
const ACTION_INITIAL_MEMBER = 'UPDATE_TASK_ACTION_INITIAL_MEMBER';
export interface UpdateTaskAction {
  type: typeof ACTION;
  params: UpdateTaskRequest;
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

interface AddMemberAction {
  type: typeof ACTION_ADD_MEMBER;
  member: Member;
}

interface InitialMemberAction {
  type: typeof ACTION_INITIAL_MEMBER;
  members: Array<Member>;
}

export type TaskUpdateActionType =
  | UpdateTaskAction
  | OnSuccessAction
  | OnFailureAction
  | AddMemberAction
  | InitialMemberAction
  | ClearAction;


const updateTask = (params: UpdateTaskRequest): UpdateTaskAction => ({
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

const addMember = (member: Member): AddMemberAction => ({
  type: ACTION_ADD_MEMBER,
  member,
})

const initialMember = (members: Array<Member>): InitialMemberAction => ({
  type: ACTION_INITIAL_MEMBER,
  members,
})
export {
  ACTION,
  ACTION_SUCCESS,
  ACTION_ERROR,
  ACTION_CLEAR,
  ACTION_INITIAL_MEMBER,
  ACTION_ADD_MEMBER,
  updateTask,
  onSuccess,
  onFailure,
  clear,
  addMember,
  initialMember,
};
