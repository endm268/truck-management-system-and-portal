// next-auth.d.ts
import NextAuth from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email?: string;
    token: string;
    expiration: string;
    role: string;
    place: string;
    type: string;
  }

  interface Session {
    user: {
      [x: string]: string;
      id: string;
      name: string;
      email?: string;
      token: string;
      expiration: string;
      role: string;
      place: string;
      type: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email?: string;
    token: string;
    expiration: string;
    role: string;
    place: string;
    type: string;
  }
}
