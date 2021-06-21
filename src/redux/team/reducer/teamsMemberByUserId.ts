import { MembersState, TeamMemberByUserIdState } from '../../ReduxState';
import {
  ACTION,
  ACTION_SUCCESS,
  ACTION_ERROR,
  GetTeamsActionType,
  ACTION_ADD_MEMBER,
  ACTION_SEARCH_MEMBER,
  ACTION_CLEAR_LOCAL,
  ACTION_INITIAL_MEMBER,
} from '../action/teamsMemberByUserId';
import { Member } from '../../../services/model/Member';
import { TeamMemberByUserId } from '../../../services/model/TeamMember';

//-------------- Actions
const initialState: TeamMemberByUserIdState = {
  teamMembers: [],
  teamMemberLocal: [],
  error: '',
};

export default (
  state = initialState,
  action: GetTeamsActionType,
): TeamMemberByUserIdState => {
  switch (action.type) {
    case ACTION:
      return {
        ...state,
        teamMembers: [],
      };

    case ACTION_SUCCESS:
      return {
        ...state,
        teamMembers: setIsActive(action.payload),
        error: '',
      };

    case ACTION_ERROR:
      return {
        ...state,
        error: action.error,
      };

    case ACTION_SEARCH_MEMBER:
      return {
        ...state,
        teamMemberLocal: findItemData(action.name, state.teamMembers)
      }

    case ACTION_ADD_MEMBER:
      return {
        ...state,
        teamMemberLocal: checkMember(state.teamMembers, action.member)
      }

    case ACTION_CLEAR_LOCAL:
      return {
        ...state,
        teamMemberLocal: [],
        teamMembers: setIsActive(state.teamMembers),
      }

    case ACTION_INITIAL_MEMBER:
      return {
        ...state,
        teamMemberLocal: action.members.map((item: any) => {
          item.isActive = true;
          return item;
        })
      }
    default:
      return state;
  }
};
const setIsActive = (arr: Array<any>) => {
  const data: Array<any> = arr.map((item: any) => {
    item.isActive = false;
    return item;
  });
  return data;
}

const checkMember = (arr: Array<any>, member: Member) => {
  const data = arr.map((item: any) => {
    if(item.memberId === member.memberId) {
      item.isActive = !item.isActive
    }
    return item;
  })
  return data;
}
function escapeRegExp(str: string) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

function findItemData(queryItem: string, array: any): Array<TeamMemberByUserId> {
  if (array !== undefined || array.length > 0) {
    if (queryItem === '') {
      return [];
    }
    var regEscape = escapeRegExp(queryItem);
    const regex = new RegExp(`${regEscape.trim()}`, 'i');
    return array.filter((item: Member) => item.name.search(regex) >= 0);
  }
  return [];
}
