import axios from '../axios/AxiosConfig';
import { GetTasksRequest, AddTaskRequest, GetTaskDetailRequest, AddSubTaskRequest, SetDoneSubTaskRequest, GetSubTaskRequest } from '../model/request/Task';

const GET_TASKS_BY_ID = 'tasks/getTasksById';
const ADD_TASK = 'task';
const GET_TASK_DETAIL = 'task/getDetail';
const ADD_SUB_TASK = 'subTask';
const DONE_SUB_TASK = 'subTask/doneTask'
const GET_SUB_TASKS = 'subTask/getSubTaskById';
const getTaskByUserId = async (params: GetTasksRequest) => {
  return axios.get(GET_TASKS_BY_ID, {
    params,
  });
};

const addTask = async (params: AddTaskRequest) => {
  return axios.post(ADD_TASK, params);
} 

const getTaskDetail = async (params: GetTaskDetailRequest) => {
  return axios.get(GET_TASK_DETAIL, {
    params,
  })
}
const setDoneSubTask = async (params: SetDoneSubTaskRequest) => {
  return axios.put(DONE_SUB_TASK, params);
}

const addSubTask = async (params: AddSubTaskRequest) => {
  return axios.post(ADD_SUB_TASK, params);
}

const getSubTasks = async (params: GetSubTaskRequest) => {
  return axios.get(GET_SUB_TASKS, {
    params,
  });
}
export default {
  getTaskByUserId,
  addTask,
  getTaskDetail,
  addSubTask,
  setDoneSubTask,
  getSubTasks,
};
