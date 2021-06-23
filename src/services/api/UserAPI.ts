import axios from '../axios/AxiosConfig';
import {
  LoginRequest, GetUsersByIdRequest
} from '../model/request/User';

const LOGIN_REQUEST = 'login';
const GET_USERS = 'users/getAllUsers';
const login = async (params: LoginRequest) => {
  return axios.post(LOGIN_REQUEST, params);
};

const getUsers = async (params: GetUsersByIdRequest) => {
  return axios.get(GET_USERS, {
    params,
  });
}
export default {
  login,
  getUsers
};
