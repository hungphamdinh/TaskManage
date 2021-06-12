export interface SendInvitationRequest {
    content: string;
    title: string;
    taskId: string;
    userId: string;
    receiverId: string;
}

export interface GetInvitationsByUserIdRequest {
    id: string;
    type: number; //0: Receiver, 1: Sender
}

export interface AcceptInvitationRequest {
    id: string;
    userId: string; //Receiver
}

export interface DeleteInvitationRequest {
    userId: string; //Sender
    id: string;
}