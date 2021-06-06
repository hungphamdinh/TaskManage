import { CommentsState } from '../../ReduxState';
import {
  ACTION,
  ACTION_SUCCESS,
  ACTION_ERROR,
  CommentsActionType,
} from '../action/comments';

//-------------- Actions
const initialState: CommentsState = {
  comments: [],
  error: '',
};

export default (
  state = initialState,
  action: CommentsActionType,
): CommentsState => {
  switch (action.type) {
    case ACTION:
      return {
        ...state,
        comments: []
      };

    case ACTION_SUCCESS:
      return {
        ...state,
        comments: action.payload,
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
