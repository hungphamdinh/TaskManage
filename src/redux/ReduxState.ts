
import { User } from '../services/model/User';
import { Task } from '../services/model/Task';
import { GetMembersRequest } from '../services/model/request/Member';

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

export interface MembersState {
  members: Array<GetMembersRequest>;
  error: string;
}
export default interface ReduxState {
  user: UserState;
  tasks: TasksState;
  task: TaskState;
  members: MembersState;
}
