import { TeamInvitationByUserIdState } from '../../ReduxState';
import {
  ACTION,
  ACTION_SUCCESS_RECEIVER,
  ACTION_SUCCESS_SENDER,
  ACTION_ERROR,
  ACTION_CLEAR,
  TeamInvitationByUserIdActionType,
} from '../action/teamInvitationsByUserId';

//-------------- Actions
const initialState: TeamInvitationByUserIdState = {
  invitationsReceiver: [],
  invitationsSender: [],
  error: '',
};

export default (
  state = initialState,
  action: TeamInvitationByUserIdActionType,
): TeamInvitationByUserIdState => {
  switch (action.type) {
    case ACTION:
      return {
        ...state,
        invitationsSender: [],
        invitationsReceiver: []
      };

    case ACTION_SUCCESS_RECEIVER:
      return {
        ...state,
        invitationsReceiver: action.receiver,
        error: '',
      };

      case ACTION_SUCCESS_SENDER:
        return {
          ...state,
          invitationsSender: action.sender,
          error: '',
        };
  

    case ACTION_CLEAR:
      return {
        ...state,
        invitationsSender: [],
        invitationsReceiver: [],
        error: '',
      }
    case ACTION_ERROR:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};
