import axios from '../axios/AxiosConfig';
import { GetTasksRequest, AddTaskRequest } from '../model/request/Task';

const GET_TASKS_BY_ID = 'tasks/getTasksById';
const ADD_TASK = 'task';
const getTaskByUserId = async (params: GetTasksRequest) => {
  return axios.get(GET_TASKS_BY_ID, {
    params,
  });
};

const addTask = async (params: AddTaskRequest) => {
  return axios.post(ADD_TASK, params);
} 

export default {
  getTaskByUserId,
  addTask
};
