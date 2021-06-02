import { GetMembersRequest } from "../../../services/model/request/Member";
import { Member } from "../../../services/model/Member";

const ACTION = 'GET_MEMBERS';
const ACTION_SUCCESS = 'GET_MEMBERS_SUCCESS';
const ACTION_ERROR = 'GET_MEMBERS_ERROR';
interface GetMembersAction {
  type: typeof ACTION;
  params: GetMembersRequest;
}

interface onSuccessAction {
  type: typeof ACTION_SUCCESS;
  payload: Array<Member>;
  isRegister?: boolean;
}

interface onFailureAction {
  type: typeof ACTION_ERROR;
  error: string;
}


type GetMembersActionType =
  | GetMembersAction
  | onSuccessAction
  | onFailureAction;

const getMembers = (params: GetMembersRequest): GetMembersAction => ({
  type: ACTION,
  params,
});

const onSuccess = (payload: Array<Member>): onSuccessAction => ({
  type: ACTION_SUCCESS,
  payload,
});

const onFailure = (error: string): onFailureAction => ({
  type: ACTION_ERROR,
  error,
});

export {
  getMembers,
  onFailure,
  onSuccess,
  GetMembersAction,
  GetMembersActionType,
  ACTION,
  ACTION_SUCCESS,
  ACTION_ERROR
}