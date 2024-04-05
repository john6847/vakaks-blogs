export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import { db } from '@/lib/config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { DbCollection } from '@/lib/config/collections';

export async function GET(request: Request, { params }: { params: { blogId: string } }) {

  const { blogId } = params;

  const blogsRef = doc(db, DbCollection.BLOGS, blogId);
  const blogSnapshot = await getDoc(blogsRef);

  if (blogSnapshot.exists()) {
    return NextResponse.json(blogSnapshot.data());
  }

  return NextResponse.json( { message: 'No blog found with the given id' }, { status: 404 });
}