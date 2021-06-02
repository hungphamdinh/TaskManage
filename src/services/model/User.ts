export interface User  {
  id: string,
  googleUserId: string,
  name: string,
  mail: string,
  role: string,
  profile: string
  message?: string;
  members: Array<User>;
}

export interface UserCredential {
  username: string;
  password: string;
  service?: string;
  storage?: string;
}
export interface UserCredentialRequest {
  username: string;
  password: string;
  email?: string;
  fullName: string;
}

