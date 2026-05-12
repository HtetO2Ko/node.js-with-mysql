import type { UserRole, UserStatus } from "../constants/enum.js";

export interface IUser {
  userid: string;
  user_name: string;
  display_name: string;
  password?: string;
  role: UserRole;
  start_date: Date;
  end_date: Date;
  status: UserStatus;
}
