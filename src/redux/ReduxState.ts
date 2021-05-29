
import { User } from '../services/model/User';

export interface UserState {
  user: User;
  error: string;
}


export default interface ReduxState {
  userState: UserState;
}
