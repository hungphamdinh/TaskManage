export interface Invitation {
    id: string;
    content: string;
    title: string;
    taskId: string;
    userId: string;
    userName: string;
    userMail: string;
    receiverId: string;
    receiverName: string;
    receiverMail: string;
    status: number;
    type: string;
}