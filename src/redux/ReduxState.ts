
import { User } from '../services/model/User';
import { Task, TaskDetail, SubTask, SubTaskStatus } from '../services/model/Task';
import { Member } from '../services/model/Member';
import { Comment } from '../services/model/Comment';
import { Invitation } from '../services/model/Invitation';
import { TeamMemberByUserId, TeamDetail, TeamInvitation } from '../services/model/TeamMember';

export interface UserState {
  user: User;
  error: string;
}
export interface UsersByIdState {
  users: Array<User>;
  usersLocal: Array<User>;
  error: string;
}
export interface TasksState {
  tasks: Array<Task>;
  error: string;
}
export interface TaskState {
  response: any;
  error: string;
}

export interface TaskLeaveState {
  response: any;
  error: string;
}

export interface TaskUpdateState {
  response: any;
  membersLocal: Array<Member>;
  error: string;
}

export interface TaskDetailState {
  taskDetail: TaskDetail;
  error: string;
}

export interface TeamDetailState {
  teamDetail: TeamDetail;
  error: string;
}


export interface MembersState {
  members: Array<Member>;
  membersLocal: Array<Member>;
  error: string;
}

export interface TeamMemberByUserIdState {
  teamMembers: Array<TeamMemberByUserId>;
  teamMemberLocal: Array<any>;
  error: string;
}
export interface AddInvitationState {
  response: any;
  error: string;
}

export interface AcceptInvitationState {
  response: any;
  error: string;
}

export interface AcceptTeamInvitationState {
  response: any;
  error: string;
}
export interface AddTeamMemberState {
  response: any;
  error: string;
}

export interface UpdateTeamMemberState {
  response: any;
  error: string;
}
export interface RejectInvitationState {
  response: any;
  error: string;
}


export interface TeamInvitationRejectState {
  response: any;
  error: string;
}
export interface InvitationByUserIdState {
  invitationsSender: Array<Invitation>;
  invitationsReceiver: Array<Invitation>;
  error: string;
}

export interface TeamInvitationByUserIdState {
  invitationsSender: Array<TeamInvitation>;
  invitationsReceiver: Array<TeamInvitation>;
  error: string;
}
export interface DeleteInvitationState {
  response: any;
  error: string;
}
export interface CommentState {
  response: any;
  error: string;
}

export interface CommentsState {
  comments: Array<Comment>;
  error: string;
}
export interface SubTaskState {
  response: any
  error: string
}
export interface SubTasksState {
  subTasks: Array<SubTask>;
  error: string
}
export interface SubTaskStatusState {
  subTaskResponse: SubTaskStatus
  error: string
}
export default interface ReduxState {
  user: UserState;
  tasks: TasksState;
  task: TaskState;
  members: MembersState;
  taskDetail: TaskDetailState;
  subTask: SubTaskState;
  subTaskStatus: SubTaskStatusState;
  comment: CommentState;
  comments: CommentsState;
  subTasks: SubTasksState;
  taskUpdate: TaskUpdateState;
  invitationSend: AddInvitationState;
  invitationsByUserId: InvitationByUserIdState;
  invitationAccept: AcceptInvitationState;
  invitationDelete: DeleteInvitationState;
  usersById: UsersByIdState;
  taskLeave: TaskLeaveState;
  invitationReject: RejectInvitationState;
  teamMemberAdd: AddTeamMemberState;
  teamMemberByUserId: TeamMemberByUserIdState;
  teamMemberUpdate: UpdateTeamMemberState;
  teamInvitationAccept: AcceptTeamInvitationState;
  teamInvitationsByUserId: TeamInvitationByUserIdState;
  teamInvitationReject: TeamInvitationRejectState;
}
