"use server"
import { DbCollection } from '@/lib/config/collections';
import { collection, doc, getDoc, getDocs, getDocsFromServer, limit, 
  orderBy, query, setDoc, startAfter, Timestamp } 
  from 'firebase/firestore';
import { Blog } from '../type';
import { db, generateId } from '@/lib/config/firebase';
import { getAuthor } from '../../users';

export const saveBlog = async (blog: Blog) => {
  const refId = generateId(DbCollection.BLOGS);

  blog.reactions = {
    LIKE: 0,
    LOVE: 0,
    DISLIKE: 0
  };

  await setDoc(doc(db, DbCollection.BLOGS, refId), {
    ...blog,
    id: refId,
    author: getAuthor(),
    publishedAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  });

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
