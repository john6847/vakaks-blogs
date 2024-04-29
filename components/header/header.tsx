"use client"
import React from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes';
import { Moon, SunMoon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSession } from '@/hooks/useSession';

export const Header = () => {

  const { setTheme, theme, systemTheme } = useTheme()
  const { status } = useSession('only-status')

  const isDarkMode = theme === 'dark' || (theme === 'system' && systemTheme === 'dark')

  const handleTheme = () => {
    if (isDarkMode) {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  return (
    <header className='relative sm:m-8 m-4 2xl:container 2xl:mx-auto z-50'>
      <div className='flex items-center justify-between shadow-2xl sm:gap-8 gap-4 w-full sm:px-6 p-4 rounded-2xl dark:bg-card/40 bg-background/60 backdrop-blur-lg'>
        <h1 className='sm:text-4xl relative text-xl text-destructive font-semibold'>
          <Link href='/'>VAKAKS <span className='absolute bottom-1 ltop-1/2  l-translate-y-1/2 sm:-right-10 -right-9 bg-background shadow-md text-destructive sm:px-2 px-1 rounded-3xl font-mono text-xs font-extrabold'>BLOG</span></Link>
        </h1>
        <Menu 
          isLogged={status==="authenticated"}
          handleTheme={handleTheme}
          isDarkMode={isDarkMode}
        />
      </div>
    </header>
  )
}


type MenuProps = {
  isLogged?: boolean
  handleTheme?: () => void
  isDarkMode?: boolean
}
const Menu = ({ handleTheme, isDarkMode, isLogged }: MenuProps) => {

  return (
    <nav className={cn('flex items-center')}>
      <ul className={cn('flex sm:gap-4 gap-2 items-center justify-end')}>
        {isLogged && <>
          <li className='block hover:text-destructive sm:text-base text-sm font-medium transition-3'>
            <Link href='/'> Home </Link>
          </li>

          <li className='block hover:text-destructive sm:text-base text-sm font-medium transition-3'>
            <Link href='/dashboard'> Dashboard </Link>
          </li>
        </>}

        <button onClick={handleTheme} className='transition-5'>
          {isDarkMode ? <SunMoon className='sm:h-6 sm:w-6 w-4 h-4 fade-in font-medium transition-3 hover:text-destructive' /> : 
          <Moon className='sm:h-6 sm:w-6 w-4 h-4 fade-in transition-3 hover:text-destructive' />}
        </button>
      </ul>
    </nav>
  )
}