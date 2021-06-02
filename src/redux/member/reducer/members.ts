import { MembersState } from '../../ReduxState';
import {
  ACTION,
  ACTION_SUCCESS,
  ACTION_ERROR,
  GetMembersActionType,
} from '../action/members';

//-------------- Actions
const initialState: MembersState = {
  members: [],
  error: '',
};

export default (
  state = initialState,
  action: GetMembersActionType,
): MembersState => {
  switch (action.type) {
    case ACTION:
      return {
        ...state,
        members: [],
      };

    case ACTION_SUCCESS:
      return {
        ...state,
        members: action.payload,
        error: '',
      };

    case ACTION_ERROR:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};
