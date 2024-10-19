// types/next-auth.d.ts
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    accessToken?: string;
    refreshToken?: string;
    role?: string;
    accessTokenExpires?: number;
  }

  interface Session {
    user: {
      id?: string;
      first_name?: string;
      last_name?: string;
      email?: string;
    };
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    role?: string;
    accessTokenExpires?: number;
    user?: {
      id?: string;
      first_name?: string;
      last_name?: string;
      email?: string;
    };
  }
}
