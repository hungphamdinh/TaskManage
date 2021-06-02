export interface GetTasksRequest {
  id: string;
}
export interface AddTaskRequest {
  name: string;
  userId: string;
  status: number;
  timeCreated: any;
  timeStart: any;
  timeEnd: any;
  members: Array<any>;
  description: string;
}
