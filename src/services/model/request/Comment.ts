import { User } from "../User";

export interface AddCommentRequest {
    message: string;
   taskId: string;
   timeCreated: any;
   user: User;
  }

export interface GetCommentsRequest {
  taskId: string;
}