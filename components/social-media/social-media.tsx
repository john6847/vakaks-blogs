import React from 'react'
import { SocialMediaIcon } from '../ui/icons/social-media-icon'
import { ArrowLeftRight, ArrowRight, ArrowUpRight } from 'lucide-react'

export default function SocialMedia() {
  return (
    <section className='relative mb-8 rounded-3xl border border-accent bg-accent shadow-2xl overflow-hidden shadow-card-foreground/20 dark:shadow-transparent'>

      {/* <span className='absolute -top-28 -left-40 h-96 w-96 rounded-full bg-background dark:opacity-20 opacity-50' />
      <span className='absolute -bottom-52 right-16 h-96 w-96 rounded-full bg-background dark:opacity-20 opacity-40' /> */}


      <div className='relative sm:mx-16 sm:mt-16 mt-4 mx-4 z-10 sm:mb-12 mb-4 pb-8  texture-polka-dots'>
        <h3 className='sm:text-5xl pt-4 px-4 text-destructive text-3xl relative font-bold'>Follow Us</h3>
        <p className='sm:text-lg mx-4 bg-accent w-fit text-sm font-mono relative z-10'>Follow Along for Exclusive Updates</p>
      </div>
      
      <nav className='flex lg:flex-nowrap bg-background rounded-2xl sm:p-16 p-8 flex-wrap sm:gap-x-16 gap-6 relative z-10'>
        <ul className='list-none flex-1 min-w-44'>
          <li className='flex gap-x-16 relative justify-between items-center p-2 rounded-md transition-5 border border-transparent hover:border-accent hover:text-destructive hover:shadow-2xl shadow-accent'>
            <SocialMediaIcon svgClassName='sm:w-8 w-6 sm:h-8 h-6' className='relative w-full z-10 bg-transparent block hover:bg-transparent hover:text-current' name='LinkedIn' url='#' />
            <span className='absolute right-2 flex items-center gap-2'>LinkedIn <ArrowUpRight size={22} /></span>
          </li>
          <hr className='my-2' />
          <li className='flex gap-4 relative justify-between items-center p-2 rounded-md transition-5 border border-transparent hover:border-accent hover:text-destructive hover:shadow-2xl shadow-accent'>
            <SocialMediaIcon svgClassName='sm:w-8 w-6 sm:h-8 h-6' className='relative w-full z-10 bg-transparent block hover:bg-transparent hover:text-current' name='Threads' url='#' />
            <span className='absolute right-2 flex items-center gap-2'>Threads <ArrowUpRight size={22} /></span>
          </li>
        </ul>

        <ul className='list-none flex-1 min-w-44'>
          <li className='flex gap-4 relative justify-between items-center p-2 rounded-md transition-5 border border-transparent hover:border-accent hover:text-destructive hover:shadow-2xl shadow-accent'>
            <SocialMediaIcon svgClassName='sm:w-8 w-6 sm:h-8 h-6' className='relative w-full z-10 bg-transparent block hover:bg-transparent hover:text-current' name='Facebook' url='#' />
            <span className='absolute right-2 flex items-center gap-2'>Facebook <ArrowUpRight size={22} /></span>
          </li>
          <hr className='my-2' />
          <li className='flex gap-4 relative justify-between items-center p-2 rounded-md transition-5 border border-transparent hover:border-accent hover:text-destructive hover:shadow-2xl shadow-accent'>
            <SocialMediaIcon svgClassName='sm:w-8 w-6 sm:h-8 h-6' className='relative w-full z-10 bg-transparent block hover:bg-transparent hover:text-current' name='Instagram' url='#' />
            <span className='absolute right-2 flex items-center gap-2'>Instagram <ArrowUpRight size={22} /></span>
          </li>
        </ul>

        <ul className='list-none flex-1 min-w-44'>
          <li className='flex gap-4 relative justify-between items-center p-2 rounded-md transition-5 border border-transparent hover:border-accent hover:text-destructive hover:shadow-2xl shadow-accent'>
            <SocialMediaIcon svgClassName='sm:w-8 w-6 sm:h-8 h-6' className='relative w-full z-10 bg-transparent block hover:bg-transparent hover:text-current' name='Twitter' url='#' />
            <span className='absolute right-2 flex items-center gap-2'>Twitter <ArrowUpRight size={22} /></span>
          </li>
          <hr className='my-2' />
          <li className='flex gap-4 relative justify-between items-center p-2 rounded-md transition-5 border border-transparent hover:border-accent hover:text-destructive hover:shadow-2xl shadow-accent'>
            <SocialMediaIcon svgClassName='sm:w-8 w-6 sm:h-8 h-6' className='relative w-full z-10 bg-transparent block hover:bg-transparent hover:text-current' name='Website' url='#' />
            <span className='absolute right-2 flex items-center gap-2'>Website <ArrowUpRight size={22} /></span>
          </li>
        </ul>

      </nav>
    </section>
  )
}
