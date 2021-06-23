
import { TeamInvitation } from "../../../services/model/TeamMember";
import { GetTeamInvitationByUserIdRequest } from "../../../services/model/request/TeamMember";

const ACTION = 'GET_TEAM_INVITATION_BY_USER_ID';
const ACTION_SUCCESS_SENDER = 'GET_TEAM_INVITATION_BY_USER_ID_SUCCESS_SENDER';
const ACTION_SUCCESS_RECEIVER = 'GET_TEAM_INVITATION_BY_USER_ID_SUCCESS_RECEIVER';
const ACTION_ERROR = 'GET_TEAM_INVITATION_BY_USER_ID_ERROR';
const ACTION_CLEAR = 'GET_TEAM_INVITATION_BY_USER_ID_CLEAR';
export interface GetTeamInvitationByUserIdAction {
  type: typeof ACTION;
  params: GetTeamInvitationByUserIdRequest;
}

interface OnSuccessSenderAction {
  type: typeof ACTION_SUCCESS_SENDER;
  sender: Array<TeamInvitation>;
}
interface OnSuccessReceiverAction {
  type: typeof ACTION_SUCCESS_RECEIVER;
  receiver: Array<TeamInvitation>;
}

interface OnFailureAction {
  type: typeof ACTION_ERROR;
  error: string;
}

interface ClearInvitationAction {
  type: typeof ACTION_CLEAR;
}

export type TeamInvitationByUserIdActionType =
  | GetTeamInvitationByUserIdAction
  | OnSuccessSenderAction
  | OnSuccessReceiverAction
  | OnFailureAction
  | ClearInvitationAction;

const getTeamInvitation = (params: GetTeamInvitationByUserIdRequest): GetTeamInvitationByUserIdAction => ({
  type: ACTION,
  params,
});

const onSuccessReceiver = (receiver: Array<TeamInvitation>): OnSuccessReceiverAction => ({
  type: ACTION_SUCCESS_RECEIVER,
  receiver,
});

const onSuccessSender = (sender: Array<TeamInvitation>): OnSuccessSenderAction => ({
  type: ACTION_SUCCESS_SENDER,
  sender,
});
const onFailure = (error: string): OnFailureAction => ({
  type: ACTION_ERROR,
  error,
});

const clearInvitationSend = (): ClearInvitationAction => ({
  type: ACTION_CLEAR,
})

export {
  getTeamInvitation,
  onFailure,
  onSuccessReceiver,
  onSuccessSender,
  clearInvitationSend,
  ACTION,
  ACTION_SUCCESS_SENDER,
  ACTION_SUCCESS_RECEIVER,
  ACTION_ERROR,
  ACTION_CLEAR,
}