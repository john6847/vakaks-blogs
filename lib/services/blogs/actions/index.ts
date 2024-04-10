"use server"
import { DbCollection } from '@/lib/config/collections';
import {
  collection, doc, getDoc, getDocs, getDocsFromServer, limit,
  orderBy, query, setDoc, startAfter, Timestamp
}
  from 'firebase/firestore';
import { db, generateId } from '@/lib/config/firebase';
import { getAuthor } from '../../users';
import { saveCategory } from '../../categories/actions';
import { Blog, BlogStatus } from '../type';

export const saveBlog = async (blogDto: any) => {
  const refId = generateId(DbCollection.BLOGS);

  const blog: Blog = {
    ...blogDto,
    id: refId,
    author: getAuthor(),
    reactions: {
      LIKE: 0,
      LOVE: 0,
      DISLIKE: 0
    },
    status: BlogStatus.PUBLISHED,
    publishedAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  }

  await setDoc(doc(db, DbCollection.BLOGS, refId), blog);
  await saveCategory(blog.categories);
}


export const getBlogs = async (perPage?: number): Promise<Blog[]> => {

  const first = query(collection(db, DbCollection.BLOGS), orderBy("publishedAt"), limit(perPage || 13));
  const documentSnapshots = await getDocs(first);

  // Get the last visible document
  const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1] || null;

  const next = query(collection(db, DbCollection.BLOGS),
    orderBy("publishedAt"),
    startAfter(lastVisible),
    limit(perPage || 13));

  const nextDocumentSnapshots = await getDocs(next);

  const blogs = documentSnapshots.docs.map(doc => doc.data());
  return blogs as Blog[];
}


export const likeBlog = async (id: string) => {
  const blog = await getBlog(id);
  if (!blog) return;
  blog.reactions.LIKE += 1;
  await setDoc(doc(db, DbCollection.BLOGS, id), blog);
}

export const dislikeBlog = async (id: string) => {
  const blog = await getBlog(id);
  if (!blog) return;
  if(blog.reactions.DISLIKE === 0) return;
  blog.reactions.DISLIKE -= 1;
  await setDoc(doc(db, DbCollection.BLOGS, id), blog);
}


export const getBlog = async (id: string): Promise<Blog> => {
  if (!id) return null as any;
  const docRef = doc(db, DbCollection.BLOGS, id);
  const docSnap = await getDoc(docRef);
  return docSnap.data() as Blog;
}


export const numberOfBlogs = async (): Promise<number> => {
  const ref = collection(db, DbCollection.BLOGS);
  const documentSnapshots = await getDocsFromServer(ref);
  return documentSnapshots.size;
}
