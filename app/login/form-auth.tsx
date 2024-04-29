"use client"
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import React from 'react'
import googleIcon from '@/public/images/icons/google-icon.svg';
import Image from 'next/image';
import { logOut, signInWithGoogle } from '@/lib/auth';
import { useSession } from '@/hooks/useSession';

export const FormAuth = () => {

  const { status } = useSession('only-status');
  const handleSignIn = async () => {
    await signInWithGoogle();
    window.location.reload();
  };

  const handleSignOut = async () => {
    await logOut();

    window.location.reload();
  };




  return (
    <div className='grid gap-6'>

      {status === "unauthenticated" ? <Button onClick={handleSignIn}>
        <Image src={googleIcon} alt="Google icon" />
        <span>Sign in with Google</span>
      </Button> :
        <Button onClick={handleSignOut} className='flex items-center gap-2'>
          <LogOut size={16} className='block mr-2' /> Sign out
        </Button>}
    </div>
  )
}
