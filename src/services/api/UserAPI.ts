import axios from '../axios/AxiosConfig';
import {
  LoginRequest, GetUsersByIdRequest, UpdateRoleRequest
} from '../model/request/User';

const LOGIN_REQUEST = 'login';
const GET_USERS = 'users/getAllUsers';
const UPDATE_ROLE = 'user/updateRole';
const login = async (params: LoginRequest) => {
  return axios.post(LOGIN_REQUEST, params);
};

const getUsers = async (params: GetUsersByIdRequest) => {
  return axios.get(GET_USERS, {
    params,
  });
}

const updateRole = async (params: UpdateRoleRequest) => {
  return axios.put(UPDATE_ROLE, params);
}
export default {
  login,
  getUsers,
  updateRole
};
