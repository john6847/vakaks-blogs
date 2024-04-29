export const dynamic = "force-dynamic";
import { DbCollection } from '@/lib/config/collections';
import { db } from '@/lib/config/firebase-client';
import { collection, getDocs } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function GET(){
  const blogsRef = collection(db, DbCollection.BLOGS);
  const blogSnapshot = await getDocs(blogsRef);
  const blogList = blogSnapshot.docs.map(doc => doc.data());
  return NextResponse.json(blogList);
}