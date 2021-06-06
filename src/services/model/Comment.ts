import { User } from "./User";

export interface Comment {
    id: string;
    message: string;
    taskId: string;
    timeCreated: any;
    user: User;
}