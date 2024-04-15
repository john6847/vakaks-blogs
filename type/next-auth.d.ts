import NextAuth from "next-auth"
import { Author } from './type';

declare module "next-auth" {
  interface Session {
    user: Account;
  }

  interface Account extends Author{}

}