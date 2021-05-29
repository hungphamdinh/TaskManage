export interface User  {
  id: string,
  googleUserId: string,
  name: string,
  mail: string,
  role: string,
  profile: string
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

