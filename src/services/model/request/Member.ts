export interface GetMembersRequest {
    userId: string;
  }
export interface AddMemberRequest {
    googleUserId: string;
    mail: string;
    memberId: string;
    name: string;
    profile: string;
    role: string;
    userId: string;
    isActive?: boolean;
  }

export interface TeamMember {
  googleUserId: string;
  name: string;
  mail: string;
  role: string;
  profile: string;
  userId: string;
  memberId: string;
}