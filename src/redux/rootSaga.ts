/* eslint-disable prettier/prettier */
import { fork, all } from 'redux-saga/effects';

import loginWithEmail from './user/sagas/user';
import getTasksByUserId from './task/sagas/tasks';
import addTask from './task/sagas/task';
import updateTask from './task/sagas/taskUpdate';
import addSubTask from './task/sagas/subTask';
import getTaskDetail from './task/sagas/taskDetail';
import getMembers from './member/sagas/members';
import setDoneSubTask from './task/sagas/subTaskStatus';
import getComments from './comment/sagas/comments';
import addComment from './comment/sagas/comment';
import getSubTasks from './task/sagas/subTasks';
import sendInvitation from './invitation/sagas/invitationSend';
import getInvitationsByUserId from './invitation/sagas/invitationByUserId';
import deleteInvitation from './invitation/sagas/invitationDelete';
import acceptInvitation from './invitation/sagas/invitationAccept';
import getUsers from './user/sagas/usersById';
import leaveTask from './task/sagas/taskLeave';
import rejectInvitation from './invitation/sagas/invitationReject';
import addTeamMember from './team/sagas/teamMemberAdd';
import getTeamMembers from './team/sagas/teamsMemberByUserId';
import getTeamDetail from './team/sagas/teamDetail';
import updateTeamMember from './team/sagas/teamMemberUpdate';
import acceptTeamInvitation from './team/sagas/teamInvitationAccept';
import getTeamInvitationsByUserId from './team/sagas/teamInvitationByUserId';
import rejectTeamInvitation from './team/sagas/teamInvitationReject';
import postProfilePic from './team/sagas/teamProfile';
import inviteTeamMember from './team/sagas/teamMemberInvite';
import updateRole from './user/sagas/userRoleUpdate';
import updateUserProfile from './user/sagas/userProfileUpdate';

export default function* rootSaga() {
  yield all([
    fork(loginWithEmail),
    fork(getTasksByUserId),
    fork(addTask),
    fork(getMembers),
    fork(getTaskDetail),
    fork(addSubTask),
    fork(setDoneSubTask),
    fork(getComments),
    fork(addComment),
    fork(getSubTasks),
    fork(updateTask),
    fork(sendInvitation),
    fork(getInvitationsByUserId),
    fork(acceptInvitation),
    fork(deleteInvitation),
    fork(getUsers),
    fork(leaveTask),
    fork(rejectInvitation),
    fork(addTeamMember),
    fork(getTeamMembers),
    fork(getTeamDetail),
    fork(updateTeamMember),
    fork(acceptTeamInvitation),
    fork(getTeamInvitationsByUserId),
    fork(rejectTeamInvitation),
    fork(postProfilePic),
    fork(inviteTeamMember),
    fork(updateRole),
    fork(updateUserProfile),
  ]);
}
