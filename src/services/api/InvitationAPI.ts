import axios from '../axios/AxiosConfig';
import { SendInvitationRequest, GetInvitationsByUserIdRequest, AcceptInvitationRequest, DeleteInvitationRequest } from '../model/request/Invitation';

const SEND_INVITATION = 'invitation/send';
const GET_INVITATIONS = 'invitation/getByUserId'
const ACCEPT_INVITATION = 'invitation/accept';
const DELETE_INVITATION = 'invitation/delete';
const sendInvitation = async (params: Array<SendInvitationRequest>) => {
  return axios.post(SEND_INVITATION, params);
};

const getInvitationByUserId = async (params: GetInvitationsByUserIdRequest) => {
  return axios.get(GET_INVITATIONS, {
    params,
  })
}

const acceptInvitation = async (params: AcceptInvitationRequest) => {
  return axios.put(ACCEPT_INVITATION, params);
}

const deleteInvitation = async (params: DeleteInvitationRequest) => {
  return axios.delete(DELETE_INVITATION, {
    params,
  })
}
export default {
  sendInvitation,
  getInvitationByUserId,
  acceptInvitation,
  deleteInvitation
};
