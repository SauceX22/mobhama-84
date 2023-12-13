import { DefaultUser, User } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
  }
}

declare module "next-auth" {
  export enum UserRole {
    ADMIN = "admin",
    MEMBER = "member",
  }

  export enum UserStatus {
    ACTIVE = "active",
    SUSPENDED = "suspended",
  }

  export interface User extends DefaultUser {
    phoneNum: string;
    role: UserRole;
    status;
  }

  interface Session {
    user: User;
  }
}
