import { Member } from "../Member";

export interface GetTasksRequest {
  id: string;
  type?: any;
}
export interface AddTaskRequest {
  name: string;
  userId: string;
  status: number;
  date: any;
  timeStart: any;
  timeEnd: any;
  members: Array<any>;
  description: string;
}
export interface AddSubTaskRequest {
  name: string;
  parentId: string;
  timeCreated: any;
}
export interface GetTaskDetailRequest {
  id: string;
  userId: string;
}
export interface SetDoneSubTaskRequest {
  id: string;
  status: number;
}

export interface GetSubTaskRequest {
  id: string;
}

export interface UpdateTaskRequest {
  id: string;
  members: Array<Member>;
  description: string;
  name: string;
  status: number;
}