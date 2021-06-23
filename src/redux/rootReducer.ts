/* eslint-disable prettier/prettier */
import { combineReducers } from 'redux';
import user from './user/reducer/user';
import app from './app/index';
import tasks from './task/reducer/tasks';
import taskDetail from './task/reducer/taskDetail';
import task from './task/reducer/task';
import taskUpdate from './task/reducer/taskUpdate';
import subTask from './task/reducer/subTask';
import subTaskStatus from './task/reducer/subTaskStatus';
import members from './member/reducer/members';
import comment from './comment/reducer/comment';
import comments from './comment/reducer/comments';
import subTasks from './task/reducer/subTasks';
import invitationSend from './invitation/reducer/invitationSend';
import invitationsByUserId from './invitation/reducer/invitationsByUserId';
import invitationAccept from './invitation/reducer/invitationAccept';
import invitationDelete from './invitation/reducer/invitationDelete';
import usersById from './user/reducer/usersById';
import taskLeave from './task/reducer/taskLeave';
import invitationReject from './invitation/reducer/invitationReject';
import teamMemberAdd from './team/reducer/teamMemberAdd';
import teamsMemberByUserId from './team/reducer/teamsMemberByUserId';
import teamDetail from './team/reducer/teamDetail';
import teamMemberUpdate from './team/reducer/teamMemberUpdate';
import teamInvitationAccept from './team/reducer/teamInvitationAccept';
import teamInvitationsByUserId from './team/reducer/teamInvitationsByUserId';
import teamInvitationReject from './team/reducer/teamInvitationReject';
import teamProfile from './team/reducer/teamProfile';
const rootReducer = combineReducers({
  user,
  tasks,
  task,
  members,
  app,
  taskDetail,
  subTask,
  subTaskStatus,
  comment,
  comments,
  subTasks,
  taskUpdate,
  invitationSend,
  invitationsByUserId,
  invitationAccept,
  invitationDelete,
  usersById,
  taskLeave,
  invitationReject,
  teamMemberAdd,
  teamsMemberByUserId,
  teamDetail,
  teamMemberUpdate,
  teamInvitationAccept,
  teamInvitationsByUserId,
  teamInvitationReject,
  teamProfile,
});

export default rootReducer;
