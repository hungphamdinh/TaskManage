import { Member } from "./Member";

export interface Task  {
  id: string,
  name: string,
  userId: string,
  status: number,
  timeCreated: any,
  members: Array<any>,
  description: string,
  timeEnd: any;
  timeStart: any;
}
export interface SubTask {
  id: string;
  name: string;
  parentId: string;
  timeCreated: string;
  status: number;
}
export interface TaskDetail {
  id: string;
  name: string;
  userId: string;
  status: string;
  timeCreated: string;
  timeStart: string;
  timeEnd: string;
  members: Array<Member>;
  description: string;
  isAdmin: boolean;
  comments: Array<any>;
  subTasks: Array<SubTask>;
}


export interface SubTaskStatus {
  id: string;
  status: number;
}
