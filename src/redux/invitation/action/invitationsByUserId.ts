
import { GetInvitationsByUserIdRequest } from "../../../services/model/request/Invitation";
import { Invitation } from "../../../services/model/Invitation";

const ACTION = 'GET_INVITATION_BY_USER_ID';
const ACTION_SUCCESS_SENDER = 'GET_INVITATION_BY_USER_ID_SUCCESS_SENDER';
const ACTION_SUCCESS_RECEIVER = 'GET_INVITATION_BY_USER_ID_SUCCESS_RECEIVER';
const ACTION_ERROR = 'GET_INVITATION_BY_USER_ID_ERROR';
const ACTION_CLEAR = 'GET_INVITATION_BY_USER_ID_CLEAR';
export interface GetInvitationByUserIdAction {
  type: typeof ACTION;
  params: GetInvitationsByUserIdRequest;
}

interface OnSuccessSenderAction {
  type: typeof ACTION_SUCCESS_SENDER;
  sender: Array<Invitation>;
}
interface OnSuccessReceiverAction {
  type: typeof ACTION_SUCCESS_RECEIVER;
  receiver: Array<Invitation>;
}

interface OnFailureAction {
  type: typeof ACTION_ERROR;
  error: string;
}

interface ClearInvitationAction {
  type: typeof ACTION_CLEAR;
}

export type GetInvitationByUserIdActionType =
  | GetInvitationByUserIdAction
  | OnSuccessSenderAction
  | OnSuccessReceiverAction
  | OnFailureAction
  | ClearInvitationAction;

const getInvitationByUserId = (params: GetInvitationsByUserIdRequest): GetInvitationByUserIdAction => ({
  type: ACTION,
  params,
});

const onSuccessReceiver = (receiver: Array<Invitation>): OnSuccessReceiverAction => ({
  type: ACTION_SUCCESS_RECEIVER,
  receiver,
});

const onSuccessSender = (sender: Array<Invitation>): OnSuccessSenderAction => ({
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
  getInvitationByUserId,
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