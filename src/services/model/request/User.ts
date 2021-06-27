export interface LoginRequest {
  name: string,
  mail: string,
  role: string,
  profile: string,
  userId: string,
}
export interface GetUsersByIdRequest {
  id: string;
  taskId?: any;
  teamId?: any;
}
export interface UpdateRoleRequest {
  userId: string;
  role: string;
}

export interface UpdateUserProfileRequest {
  userId: string;
  role: string;
  profile: any;
}