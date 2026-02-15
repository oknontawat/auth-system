export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
}

export interface PasswordReset {
  email: string;
  token: string;
  expires: Date;
}

export const users: User[] = [];
export const passwordResets: PasswordReset[] = [];
