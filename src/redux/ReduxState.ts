
import { User } from '../services/model/User';
import { Task, TaskDetail, SubTask, SubTaskStatus } from '../services/model/Task';
import { Member } from '../services/model/Member';
import { Comment } from '../services/model/Comment';

export interface UserState {
  user: User;
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

export interface TaskDetailState {
  taskDetail: TaskDetail;
  error: string;
}

export interface MembersState {
  members: Array<Member>;
  membersLocal: Array<Member>;
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
}
