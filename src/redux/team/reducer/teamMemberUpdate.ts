import { UpdateTeamMemberState } from '../../ReduxState';
import {
  ACTION,
  ACTION_SUCCESS,
  ACTION_ERROR,
  TeamMemberUpdateActionType,
  ACTION_CLEAR,
} from '../action/teamMemberUpdate';

//-------------- Actions
const initialState: UpdateTeamMemberState = {
  response: undefined,
  error: '',
};

export default (
  state = initialState,
  action: TeamMemberUpdateActionType,
): UpdateTeamMemberState => {
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
