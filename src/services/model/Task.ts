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
  date: any;
}
export interface SubTask {
  id: string;
  name: string;
  parentId: string;
  timeCreated: string;
  status: number;
}

export interface TotalTask {
  urgent: number;
  onGoing: number;
  running: number;
  done: number;
  totalTask: number;
  urgentPercentage: number;
  onGoingPercentage: number;
  runningPercentage: number;
  donePercentage: number;
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
  date: any;
}


export interface SubTaskStatus {
  id: string;
  status: number;
}

export interface Item {
  id: any;
  name: string;
  isActive?: boolean;
  color?: any;
}
