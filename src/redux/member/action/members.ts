import { GetMembersRequest } from "../../../services/model/request/Member";
import { Member } from "../../../services/model/Member";

const ACTION = 'GET_MEMBERS';
const ACTION_SUCCESS = 'GET_MEMBERS_SUCCESS';
const ACTION_ERROR = 'GET_MEMBERS_ERROR';
const ACTION_ADD_MEMBER = 'ACTION_ADD_MEMBER';
const ACTION_SEARCH_MEMBER = 'ACTION_SEARCH_MEMBER';
const ACTION_CLEAR_LOCAL = 'GET_MEMBERS_ACTION_CLEAR_LOCAL';
const ACTION_INITIAL_MEMBER = 'GET_MEMBERS_ACTION_INITIAL_MEMBER';
const ACTION_PUSH_MEMBER_LOCAL = 'GET_MEMBERS_ACTION_PUSH_MEMBER_LOCAL';
interface GetMembersAction {
  type: typeof ACTION;
  params: GetMembersRequest;
}
interface InitialMemberAction {
  type: typeof ACTION_INITIAL_MEMBER;
  members: Array<Member>;
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

interface AddMemberAction {
  type: typeof ACTION_ADD_MEMBER
  member: Member;
}

interface SearchMemberAction {
  type: typeof ACTION_SEARCH_MEMBER;
  name: string;
}

interface ClearMemberLocalAction {
  type: typeof ACTION_CLEAR_LOCAL;
}

interface PushMemberLocalAction {
  type: typeof ACTION_PUSH_MEMBER_LOCAL;
  members: Array<Member>;
}
type GetMembersActionType =
  | GetMembersAction
  | onSuccessAction
  | AddMemberAction
  | SearchMemberAction
  | ClearMemberLocalAction
  | InitialMemberAction
  | PushMemberLocalAction
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

const addMember = (member: Member): AddMemberAction => ({
  type: ACTION_ADD_MEMBER,
  member,
})

const searchMember = (name: string): SearchMemberAction => ({
  type: ACTION_SEARCH_MEMBER,
  name,
})

const clearMemberLocal = (): ClearMemberLocalAction => ({
  type: ACTION_CLEAR_LOCAL,
})

const initialMember = (members: Array<Member>): InitialMemberAction => ({
  type: ACTION_INITIAL_MEMBER,
  members,
})

const pushMemberLocal = (members: Array<Member>): PushMemberLocalAction => ({
  type: ACTION_PUSH_MEMBER_LOCAL,
  members,
})
export {
  getMembers,
  onFailure,
  onSuccess,
  addMember,
  clearMemberLocal,
  searchMember,
  initialMember,
  pushMemberLocal,
  GetMembersAction,
  GetMembersActionType,
  ACTION,
  ACTION_SUCCESS,
  ACTION_ERROR,
  ACTION_ADD_MEMBER,
  ACTION_SEARCH_MEMBER,
  ACTION_INITIAL_MEMBER,
  ACTION_CLEAR_LOCAL,
  ACTION_PUSH_MEMBER_LOCAL,
}