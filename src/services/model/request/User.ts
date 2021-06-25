export interface LoginRequest {
  name: string,
  mail: string,
  role: string,
  profile: string,
  userId: string,
}
export interface GetUsersByIdRequest {
  id: string;
}
export interface UpdateRoleRequest {
  userId: string;
  role: string;
}