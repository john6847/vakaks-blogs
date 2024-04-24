"use client"
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react'
import googleIcon from '@/public/images/icons/google-icon.svg';
import Image from 'next/image';

export const FormAuth = () => {
  const { status } = useSession();
  const isLogged = status === "authenticated";
  return (
    <div>
      {!isLogged ? <Button variant="secondary" onClick={() => signIn("google", {callbackUrl:"/"})} className='cursor-pointer gap-2' title='Login with Google'>
          {/* <LogIn className='h-6 w-6 fade-in' /> */}
          <Image src={googleIcon} width={100} height={100}  alt='Google Icon' className='h-6 w-6' /> Sign in with Google
        </Button> :
          <Button  onClick={() => signOut()} className='cursor-pointer gap-2' title='Logout'>
            <LogOut className='h-6 cursor-pointer w-6 fade-in' /> Logout
          </Button>
        }
    </div>
  )
}
