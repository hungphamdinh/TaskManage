import { TeamDetailState } from '../../ReduxState';
import {
  ACTION_SUCCESS,
  ACTION_ERROR,
  TeamDetailActionType,
  ACTION,
} from '../action/teamDetail';
import { TeamDetail } from '../../../services/model/TeamMember';


//-------------- Actions
const initialState: TeamDetailState = {
  teamDetail: undefined as unknown as TeamDetail,
  error: '',
};

export default (
  state = initialState,
  action: TeamDetailActionType,
): TeamDetailState => {
  switch (action.type) {
    case ACTION:
      return {
        ...state,
        teamDetail: undefined as unknown as TeamDetail,
      };
    case ACTION_SUCCESS:
      return {
        ...state,
        teamDetail: action.payload,
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

