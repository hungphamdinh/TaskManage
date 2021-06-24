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
} from '../action/members';
import { Member } from '../../../services/model/Member';

//-------------- Actions
const initialState: MembersState = {
  members: [],
  membersLocal: [],
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
        membersLocal: checkMember(state.members, action.member)
      }

    case ACTION_CLEAR_LOCAL:
      return {
        ...state,
        membersLocal: [],
        members: setIsActive(state.members),
      }

    case ACTION_INITIAL_MEMBER:
      return {
        ...state,
        membersLocal: action.members.map((item: any) => {
          item.isActive = false;
          return item;
        })
      }

     case ACTION_PUSH_MEMBER_LOCAL:
       return {
         ...state,
         members: state.membersLocal.concat(action.members),
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
