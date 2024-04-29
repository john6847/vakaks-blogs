import { Author } from '@/types';
import { Timestamp } from 'firebase/firestore';

export enum BlogStatus {
  DRAFT= "DRAFT",
  PUBLISHED= "PUBLISHED",
  ARCHIVED = "ARCHIVED"
}

export type ReactionType = 'LIKE' | 'LOVE' | "DISLIKE"



export interface Blog {
  id: string;
  title: string;
  content: any;
  shortDescription: string;
  cover: string;
  author: Author;
  categories: string[];
  reactions: Record<ReactionType, number>;
  status: BlogStatus;
  publishedAt: Timestamp;
  updatedAt: Timestamp;
}
