import { CommentState } from '../../ReduxState';
import {
  ACTION,
  ACTION_SUCCESS,
  ACTION_ERROR,
  ACTION_CLEAR,
  CommentActionType,
} from '../action/comment';

//-------------- Actions
const initialState: CommentState = {
  response: undefined,
  error: '',
};

export default (
  state = initialState,
  action: CommentActionType,
): CommentState => {
  switch (action.type) {
    case ACTION:
      return {
        ...state,
        response: undefined as any,
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
      }

    default:
      return state;
  }
};
