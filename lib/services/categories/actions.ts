import { DbCollection } from '@/lib/config/collections';
import { db } from '@/lib/config/firebase';
import { doc, getDoc, getDocs, setDoc } from 'firebase/firestore';


export const saveCategory = async (categories: string[]) => {

  categories = categories.map((category) => category.toLowerCase().replaceAll('  ', ' ').trim());

  const docRef = doc(db, DbCollection.SETTINGS, "categories");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data:string[] = docSnap.data().data ? docSnap.data().data : [];
    const uniqueList = data.concat(categories.filter((item) => data.indexOf(item) < 0));
    await setDoc(doc(db, DbCollection.SETTINGS, "categories"), {
      data: uniqueList
    });
    return;
  }
  
  await setDoc(doc(db, DbCollection.SETTINGS, "categories"), {
    data: categories
  });
}
