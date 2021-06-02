import axios from '../axios/AxiosConfig';
import { GetMembersRequest } from '../model/request/Member';

const GET_MEMBERS = 'members/getById';

const getMembers = async (params: GetMembersRequest) => {
  return axios.get(GET_MEMBERS, {
    params,
  });
};

export default {
  getMembers
};
