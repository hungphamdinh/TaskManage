import { InvitationByUserIdState } from '../../ReduxState';
import {
  ACTION,
  ACTION_SUCCESS,
  ACTION_ERROR,
  GetInvitationByUserIdActionType,
} from '../action/invitationsByUserId';

//-------------- Actions
const initialState: InvitationByUserIdState = {
  invitations: [],
  error: '',
};

export default (
  state = initialState,
  action: GetInvitationByUserIdActionType,
): InvitationByUserIdState => {
  switch (action.type) {
    case ACTION:
      return {
        ...state,
        invitations: [],
      };

    case ACTION_SUCCESS:
      return {
        ...state,
        invitations: action.payload,
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
