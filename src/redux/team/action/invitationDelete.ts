
import { DeleteInvitationRequest } from "../../../services/model/request/Invitation";

const ACTION = 'DELETE_INVITATION';
const ACTION_SUCCESS = 'DELETE_INVITATION_SUCCESS';
const ACTION_ERROR = 'DELETE_INVITATION_ERROR';
const ACTION_CLEAR = 'DELETE_INVITATION_CLEAR';
export interface DeleteInvitationAction {
  type: typeof ACTION;
  params: DeleteInvitationRequest;
}

interface OnSuccessAction {
  type: typeof ACTION_SUCCESS;
  payload: any;
}

interface OnFailureAction {
  type: typeof ACTION_ERROR;
  error: string;
}

interface ClearInvitationAction {
  type: typeof ACTION_CLEAR;
}

export type DeleteInvitationActionType =
  | DeleteInvitationAction
  | OnSuccessAction
  | OnFailureAction
  | ClearInvitationAction;

const deleteInvitation = (params: DeleteInvitationRequest): DeleteInvitationAction => ({
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

const clearInvitationDelete = (): ClearInvitationAction => ({
  type: ACTION_CLEAR,
})

export {
  deleteInvitation,
  onFailure,
  onSuccess,
  clearInvitationDelete,
  ACTION,
  ACTION_SUCCESS,
  ACTION_ERROR,
  ACTION_CLEAR,
}