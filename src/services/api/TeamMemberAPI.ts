import axios from '../axios/AxiosConfig';
import { AddTeamMemberRequest, GetTeamDetailRequest, UpdateTeamMemberRequest, GetTeamInvitationByUserIdRequest, RejectTeamInvitationRequest, PostProfilePicRequest, TeamMember, InviteTeamMemberRequest } from '../model/request/TeamMember';
import { GetTeamMembersRequest } from '../model/request/TeamMember';
import { AcceptTeamInvitationRequest, DeleteTeamInvitationRequest } from '../model/request/Invitation';

const ADD_TEAM_MEMBER = 'team/addTeam';
const INVITE_TEAM_MEMBER = 'team/invite';
const UPDATE_TEAM_MEMBER = 'team/update';
const GET_TEAMS_MEMBER_BY_USER_ID = 'team/getByUserId';
const TEAM_DETAIL = 'team/getDetail'
const POST_PROFILE_PIC = 'team/upload';
const ACCEPT_TEAM_INVITATION = 'teamInvitation/accept';
const GET_TEAM_INVITATION = 'teamInvitation/getByUserId';
const REJECT_TEAM_INVITATION = 'teamInvitation/reject';
const DELETE_TEAM_INVITATION = 'teamInvitation/delete';
const addTeamMember = async (params: AddTeamMemberRequest) => {
  return axios.post(ADD_TEAM_MEMBER, params);
};

const getTeamsMemberByUserId = async (params: GetTeamMembersRequest) => {
  return axios.get(GET_TEAMS_MEMBER_BY_USER_ID, {
    params,
  })
}

const getTeamDetail = async (params: GetTeamDetailRequest) => {
  return axios.get(TEAM_DETAIL, {
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

const postProfilePic = async (params: PostProfilePicRequest) => {
  var photo = {
    uri: params.file.uri,
    type: 'image/jpeg',
    name: `${new Date().getTime()}.png`,
  };
  const data = new FormData();
  data.append('file', photo as any);
  data.append('teamId', params.teamId);
  return axios.put(POST_PROFILE_PIC, data);
}

const inviteTeamMember = (params: InviteTeamMemberRequest) => {
  return axios.post(INVITE_TEAM_MEMBER, params);
}

const deleteTeamInvitation = (params: DeleteTeamInvitationRequest) => {
  return axios.delete(DELETE_TEAM_INVITATION, {
    params,
  })
}
export default {
  addTeamMember,
  getTeamsMemberByUserId,
  getTeamDetail,
  updateTeamMember,
  acceptTeamInvitation,
  getTeamInvitation,
  rejectTeamInvitation,
  postProfilePic,
  inviteTeamMember,
  deleteTeamInvitation,
};
