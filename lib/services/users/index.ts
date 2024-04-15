"use server"
import { DbCollection } from '@/lib/config/collections';
import { db } from '@/lib/config/firebase';
import { Author, UserStatus } from '@/type/type';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';

export const getAuthor = (): Author => {
    return {
        id: new Date().getTime().toString(),
        displayName: 'Joe Watson SBF',
        email: 'joe@gmail.com',
        profession: 'Software Engineer',
        photoURL: 'https://images.unsplash.com/photo-1575846171058-979e0c211b54',
        status: UserStatus.ACTIVE,
        uid: new Date().getTime().toString(),
        bio: 'I am a software engineer',
        links: [
            {
                name: 'Facebook',
                url: 'https://facebook.com'
            },
            {
                name: 'Twitter',
                url: 'https://twitter.com'
            }
        ],
        phoneNumber: '1234567890'
    } as Author
}

export const getUsers = async (): Promise<Author[]> => {
    const ref = collection(db, DbCollection.USERS)
    const snapshot = await getDocs(ref)
    return snapshot.docs.map(doc => doc.data()) as Author[]
}
export const getAuthorByUid = async (id: string | null | undefined): Promise<Author> => {
    if (!id) return null as any;
    const docRef = doc(db, DbCollection.BLOGS, id);
    const docSnap = await getDoc(docRef);
    return docSnap.data() as Author;
}


export const getUserByEmail = async (email: string): Promise<Author> => {

    if (!email) return null as any;

    const q = query(collection(db, DbCollection.USERS), where("email", "==", email.toLowerCase()));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.find(doc => doc.data().email === email.toLowerCase());

    if(!data) return null as any;

    return data.data() as Author;
}

export const getLoginUserSession = async (email: string): Promise<Author> => { 
    const user = await getUserByEmail(email);
    if(!user) {
        throw new Error('You are not authorized to connect to this application!');
    }
    return user;
}