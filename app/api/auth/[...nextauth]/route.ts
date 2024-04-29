export const dynamic = "force-dynamic";
import { auth } from '@/lib/config/firebase-client';
import { getUserByEmail } from '@/lib/services/users';
import { Author } from '@/types';
import { signInWithEmailAndPassword } from 'firebase/auth';
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email" }
      },
      // @ts-ignore
      async authorize(credentials, req) {

        if(!credentials) {
          throw new Error('No credentials provided!')
        }
        const { email } = credentials
        if(!(email)) {
          throw new Error('Email are required!')
        }

        return {
          email
        }
      }
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  callbacks: {
    async jwt({ token, user }) {
      const author: Author = await getUserByEmail(user?.email as string)

      if (author) {
        token = {
          ...author
        }
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          ...token
        }
      }
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
});

export { handler as GET, handler as POST };