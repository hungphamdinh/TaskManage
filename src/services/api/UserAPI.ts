import axios from '../axios/AxiosConfig';
import {
  LoginRequest
} from '../model/request/User';

const LOGIN_REQUEST = 'login';

const login = async (params: LoginRequest) => {
  return axios.post(LOGIN_REQUEST, params);
};

export default {
  login
};
