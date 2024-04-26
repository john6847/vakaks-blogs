import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <main className='min-h-screen -mt-36 -mb-16 flex flex-col items-center justify-center sm:p-16 p-8 bg-destructive text-background dark:text-foreground'>
      <div className='py-8 space-y-4'>
        <h1 className='text-center md:text-9xl text-7xl'>
          Oops! Page not found.
        </h1>
        <p className='text-lg font-mono text-center'>
          The page you ara looking for was not found.
        </p>
      </div>
      <hr className='w-1/2 border border-background border-dashed dark:border-foreground mb-4' />

      <Link href='/' className='text-lg text-center flex items-center gap-1 hover:flex-row-reverse font-semibold transition-5'>
        Go back Home <ArrowRight size={24} className='transition-5'/>
      </Link>

    </main>

  )
}
