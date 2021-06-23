export interface AddTeamMemberRequest {
  teamName: string;
  profile: string;
  userId: string;
  members: Array<TeamMember>;
}
export interface TeamMember {
  googleUserId: string;
  name: string;
  mail: string;
  role: string;
  profile: string;
  userId: string;
  memberId: string;
  isActive?: boolean;
}
export interface GetTeamDetailRequest {
  id: string;
  userId: string;
}

export interface UpdateTeamMemberRequest {
  teamId: string;
  teamName: string;
  profile?: string;
  members: Array<TeamMemberUpdate>;
}
export interface TeamMemberUpdate {
  googleUserId: string;
  name: string;
  mail: string;
  role: string;
  profile: string;
  userId: string;
  memberId: string;
  teamMemberId: string;
  isActive?: boolean;
}

export interface GetTeamInvitationByUserIdRequest {
  type: number;
  id: string;
  teamId?: string;
}

export interface RejectTeamInvitationRequest {
  id: string;
}
export interface GetTeamMembersRequest {
  userId: string;  
}

export interface PostProfilePicRequest {
  teamId: any;
  file: any;
}