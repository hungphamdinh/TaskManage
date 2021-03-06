import { AddTeamMemberState } from '../../ReduxState';
import {
  ACTION,
  ACTION_SUCCESS,
  ACTION_ERROR,
  AddTeamMemberActionType,
  ACTION_CLEAR,
} from '../action/teamMemberAdd';
import { AddTeamMember } from '../../../services/model/TeamMember';

//-------------- Actions
const initialState: AddTeamMemberState = {
  response: {} as unknown as AddTeamMember,
  error: '',
};

export default (
  state = initialState,
  action: AddTeamMemberActionType,
): AddTeamMemberState => {
  switch (action.type) {
    case ACTION:
      return {
        ...state,
        response: {} as any,
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
        response: {} as any,
        error: ''
      }
      
    default:
      return state;
  }
};

