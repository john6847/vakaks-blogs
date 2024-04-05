import React from 'react'
import { ThemeSwitcher } from '../ui/theme-switcher'
import Link from 'next/link'

export const Header = () => {
  return (
    <header className='relative sm:m-8 m-4 p-6 2xl:container 2xl:mx-auto rounded-3xl bg-background/60 backdrop-blur-lg z-50'>
      <div className='flex justify-between gap-8 w-full'>
        <h1 className='text-4xl text-destructive dark:text-foreground font-semibold'>
        <Link href='/'>VAKAKS BLOG</Link>
        </h1>
        <nav className='flex gap-8 items-center'>
          <ul className='flex gap-8 items-center justify-end'>
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
