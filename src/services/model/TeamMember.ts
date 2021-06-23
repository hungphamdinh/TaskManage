import { TeamMember } from "./request/TeamMember";

export interface TeamMemberByUserId  {
    teamId: string;
    isAdmin: boolean;
    profile: string;
    userId: string;
    teamName: string;
    isActive?: boolean;
}

export interface TeamDetail {
    teamId: string;
    isAdmin: boolean;
    teamName: string;
    profile: string;
    userId: string;
    members: Array<TeamMemberDetail>;
}

export interface TeamMemberDetail {
    profile: string;
    memberId: string;
    googleUserId: string;
    teamMemberId: string;
    mail: string;
    userId: string;
    role: string;
    name: string;
    teamId: string;
}
export interface TeamInvitation  {
    member: TeamMember,
    receiverId: string,
    timeCreated: string,
    userId: string,
    content: string,
    id: string,
    teamId: string,
    status: number,
    type: string;
}

export interface AddTeamMember {
    id: string;
}