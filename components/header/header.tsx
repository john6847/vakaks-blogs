import React from 'react'
import { ThemeSwitcher } from '../ui/theme-switcher'
import Link from 'next/link'

export const Header = () => {
  return (
    <header className='relative sm:m-8 m-4 sm:p-6 p-4 2xl:container 2xl:mx-auto rounded-3xl dark:bg-card/40 bg-background/60 backdrop-blur-lg z-50'>
      <div className='flex items-center justify-between sm:gap-8 gap-4 w-full'>
        <h1 className='sm:text-4xl  text-xl text-destructive dark:text-foreground font-semibold'>
        <Link href='/'>VAKAKS BLOG</Link>
        </h1>
        <nav className='flex sm:gap-8 gap-4 items-center'>
          <ul className='flex sm:gap-8 gap-4 items-center justify-end'>
            <li className='block hover:text-destructive'>
              <Link href='/'> Home </Link>
            </li>
            <li className='block hover:text-destructive'>
              <Link href='/dashboard'> Dashboard </Link>
            </li>
          </ul>
          <ThemeSwitcher />
        </nav>
      </div>
    </header>
  )
}
