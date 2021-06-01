
import { User } from '../services/model/User';
import { Task } from '../services/model/Task';

export interface UserState {
  user: User;
  error: string;
}
export interface TasksState {
  tasks: Array<Task>;
  error: string;
}

export default interface ReduxState {
  user: UserState;
  tasks: TasksState;
}
