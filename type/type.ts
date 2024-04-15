import { User } from 'firebase/auth';

export enum UserStatus {
  ACTIVE="ACTIVE", INACTIVE="INACTIVE"
}

export interface Link {
  name: string;
  url: string;
}

export enum UserRole {
  ADMIN="ADMIN", AUTHOR="AUTHOR", USER="USER"
}

export interface Author extends User {
  id: string;
  profession: string;
  status: UserStatus;
  bio: string;
  links: Link[];
}

export type SearchParams = {
  searchParams: { [key: string]: string | undefined }
}