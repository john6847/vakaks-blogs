"use client"
import React from 'react'
import { ThemeSwitcher } from '../ui/theme-switcher'
import Link from 'next/link'
import { useSession } from 'next-auth/react';

export const Header = () => {

  const { status } = useSession();
  const isLogged = status === "authenticated";

  return (
    <header className='relative sm:m-8 m-4 2xl:container 2xl:mx-auto z-50'>
      <div className='flex items-center justify-between sm:gap-8 gap-4 w-full'>
        <h1 className='sm:text-4xl text-xl text-destructive font-semibold'>
          <Link href='/'>VAKAKS BLOG</Link>
        </h1>
        <nav className='flex px-4 py-2 rounded-2xl dark:bg-card/40 bg-background/60 backdrop-blur-lg sm:gap-8 gap-4 items-center'>
          {isLogged && <ul className='sm:flex hidden sm:gap-8 gap-4 items-center justify-end'>
            <li className='block hover:text-destructive'>
              <Link href='/'> Home </Link>
            </li>

            <li className='block hover:text-destructive'>
              <Link href='/dashboard'> Dashboard </Link>
            </li>
          </ul>}
          <ThemeSwitcher isLogged={isLogged} />
        </nav>
      </div>
    </header>
  )
}
