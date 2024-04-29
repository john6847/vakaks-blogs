import NextAuth from "next-auth"
import { Author } from '.';

declare module "next-auth" {
  interface Session {
    user: Account;
  }

  interface Account extends Author{}

}