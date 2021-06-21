import { TeamInvitationRejectState } from '../../ReduxState';
import {
  ACTION,
  ACTION_SUCCESS,
  ACTION_ERROR,
  RejectInvitationActionType,
  ACTION_CLEAR,
} from '../action/teamInvitationReject';

//-------------- Actions
const initialState: TeamInvitationRejectState = {
  response: undefined,
  error: '',
};

export default (
  state = initialState,
  action: RejectInvitationActionType,
): TeamInvitationRejectState => {
  switch (action.type) {
    case ACTION:
      return {
        ...state,
        response: undefined,
      };

    case ACTION_SUCCESS:
      return {
        ...state,
        response: action.payload,
        error: '',
      };

    case ACTION_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case ACTION_CLEAR:
      return {
        ...state,
        response: undefined,
        error: ''
      }
      
    default:
      return state;
  }
};

