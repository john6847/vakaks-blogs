import { Author, UserStatus } from '@/type/type';

export const getAuthor=():Author=>{
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