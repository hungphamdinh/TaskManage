import axios from '../axios/AxiosConfig';
import { AddTeamMemberRequest, GetTeamDetailRequest, UpdateTeamMemberRequest, GetTeamInvitationByUserIdRequest, RejectTeamInvitationRequest } from '../model/request/TeamMember';
import { GetTeamMembersRequest } from '../model/request/Member';
import { AcceptTeamInvitationRequest } from '../model/request/Invitation';

const ADD_TEAM_MEMBER = 'team/add';
const UPDATE_TEAM_MEMBER = 'team/update';
const GET_TEAMS_MEMBER_BY_USER_ID = 'team/getByUserId';
const GET_TEAM_DETAIL = 'team/getDetail'
const ACCEPT_TEAM_INVITATION = 'teamInvitation/accept';
const GET_TEAM_INVITATION = 'teamInvitation/getByUserId';
const REJECT_TEAM_INVITATION = 'teamInvitation/reject';
const addTeamMember = async (params: AddTeamMemberRequest) => {
  return axios.post(ADD_TEAM_MEMBER, params);
};

const getTeamsMemberByUserId = async (params: GetTeamMembersRequest) => {
  return axios.get(GET_TEAMS_MEMBER_BY_USER_ID, {
    params,
  })
}

const getTeamDetail = async (params: GetTeamDetailRequest) => {
  return axios.get(GET_TEAM_DETAIL, {
    params,
  })
}

const updateTeamMember = async (params: UpdateTeamMemberRequest) => {
  return axios.put(UPDATE_TEAM_MEMBER, params);
}

const acceptTeamInvitation = async (params: AcceptTeamInvitationRequest) => {
  return axios.put(ACCEPT_TEAM_INVITATION, params);
}

const getTeamInvitation = async (params: GetTeamInvitationByUserIdRequest) => {
  return axios.get(GET_TEAM_INVITATION, {
    params,
  })
}

const rejectTeamInvitation = async (params: RejectTeamInvitationRequest) => {
  return axios.put(REJECT_TEAM_INVITATION, params)
}
export default {
  addTeamMember,
  getTeamsMemberByUserId,
  getTeamDetail,
  updateTeamMember,
  acceptTeamInvitation,
  getTeamInvitation,
  rejectTeamInvitation,
};
