import axios from '../axios/AxiosConfig';
import {
  LoginRequest, GetUsersByIdRequest, UpdateRoleRequest
} from '../model/request/User';

const LOGIN_REQUEST = 'login';
const GET_USERS = 'users/getAllUsers';
const UPDATE_ROLE = 'user/updateRole';
const GET_GOOGLE_USER_INFO = "https://www.googleapis.com/oauth2/v1/userinfo?alt=json";

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
const getGoogleUserInfo = async (token: any) => {
  return axios.get(GET_GOOGLE_USER_INFO, {
     headers: {"Authorization" : `Bearer ${token}`} 
  });
}
export default {
  login,
  getUsers,
  updateRole,
  getGoogleUserInfo
};
