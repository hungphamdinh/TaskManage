import { MembersState } from '../../ReduxState';
import {
  ACTION,
  ACTION_SUCCESS,
  ACTION_ERROR,
  GetMembersActionType,
  ACTION_ADD_MEMBER,
  ACTION_SEARCH_MEMBER,
  ACTION_CLEAR_LOCAL,
  ACTION_INITIAL_MEMBER,
  ACTION_PUSH_MEMBER_LOCAL,
  ACTION_RESET_FLAG,
} from '../action/members';
import { Member } from '../../../services/model/Member';
import { TeamMemberByUserId } from '../../../services/model/TeamMember';

//-------------- Actions
const initialState: MembersState = {
  members: [],
  membersLocal: [],
  editFlag: 0,
  teamItem: undefined as unknown as TeamMemberByUserId,
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
        members: setIsActive(action.payload),
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
        membersLocal: findItemData(action.name, state.members)
      }

    case ACTION_ADD_MEMBER:
      return {
        ...state,
        membersLocal: checkMember(state.membersLocal.length > 0 ? state.membersLocal : state.members, action.member)
      }

    case ACTION_CLEAR_LOCAL:
      return {
        ...state,
        membersLocal: [],
        editFlag: 0,
        members: [],
      }

    case ACTION_INITIAL_MEMBER:
      return {
        ...state,
        members: action.members.map((item: any) => {
          item.isActive = true;
          return item;
        })
      }

     case ACTION_PUSH_MEMBER_LOCAL:
       return {
         ...state,
         membersLocal: state.members.concat(action.members),
         members: state.members.concat(action.members),
         editFlag: action.editFlag ? action.editFlag : 0,
       }

    case ACTION_RESET_FLAG:
      return {
        ...state,
        editFlag: 0,
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

const checkMember = (arr: Array<Member>, member: Member) => {
  const data = arr.map((item: Member) => {
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

function findItemData(queryItem: string, array: any): Array<Member> {
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
