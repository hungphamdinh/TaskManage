import axios from '../axios/AxiosConfig';
import { AddCommentRequest, GetCommentsRequest } from '../model/request/Comment';

const ADD_COMMENT = 'comment';
const GET_COMMENTS = 'comment/getByTaskId';

const addComment = async (params: AddCommentRequest) => {
  return axios.post(ADD_COMMENT, params);
};

const getCommentsByTaskId = async (params: GetCommentsRequest) => {
  return axios.get(GET_COMMENTS, {
    params,
  })
}
export default {
  addComment,
  getCommentsByTaskId
};
