import axios from 'axios';
import _ from 'lodash';
import BuildConfig, { Environments } from '../../config/BuildConfig';
import { _getStorage } from '../../utilities/Utils';
const api = axios.create({
  baseURL:
    BuildConfig == Environments.DEVELOPMENT
      ? 'https://apigs.esure.vn/api/'
      : 'http://localhost:8080/api/',
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // console.log(error);
      const message =
        _.get(error, 'response.data.error.common') ||
        _.get(error, 'response.data.message') ||
        _.get(error, 'response.data.errors.common');
      return Promise.reject({
        message: error.request._response,
        code: error.response.status,
      });
    } else if (error.request) {
      return Promise.reject({ common: 'No response was received' });
    }
    return Promise.reject({ common: error.message });
  },
);

// api.interceptors.request.use(async (config) => {
//   const token = await _getStorage(Token.accessToken);
//   config.headers.Authorization = 'Bearer ' + token.access_token;
//   return config;
// });

// export function setAuthorizationToken(token) {
//   api.defaults.headers.common.Authorization = token;
// }

export default api;
