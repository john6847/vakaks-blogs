import React from 'react'

export const Footer = () => {
  return (
    <footer className='sm:p-8 p-4 dark:bg-popover bg-foreground dark:text-foreground text-card -mb-16 rounded-t-3xl'>

      <div className='2xl:container 2xl:mx-auto space-y-8 sm:pt-16  text-center pt-8'>
        <div className='flex items-center md:gap-8 gap-4 text-center justify-center flex-wrap'>
          <h1 className='text-title dark:text-destructive leading-tight font-semibold'>VAKAKS Blog</h1>
          <p className='text-base sm:-mt-4 font-mono opacity-60'>A blog about programming, web development, and tech.</p>
        </div>
        <hr className='border-card dark:border-accent' />
      </div>

      <div className='flex justify-center items-center py-8'>
        <p className='text-lg font-light'>© {new Date().getFullYear()} <strong className='font-bold'>VAKAKS</strong>. All rights reserved.</p>
      </div>

    </footer>
  )
}
