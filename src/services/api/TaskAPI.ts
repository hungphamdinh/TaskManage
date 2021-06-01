import axios from '../axios/AxiosConfig';
import { GetTasksRequest } from '../model/request/Task';

const GET_TASKS_BY_ID = 'tasks/getTasksById';

const getTaskByUserId = async (params: GetTasksRequest) => {
  return axios.get(GET_TASKS_BY_ID, {
    params,
  });
};

export default {
  getTaskByUserId
};
