import { db } from '@/lib/config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function GET(){
  const blogsRef = collection(db, 'friends');
  const blogSnapshot = await getDocs(blogsRef);
  const cityList = blogSnapshot.docs.map(doc => doc.data());
  return NextResponse.json(cityList);
}