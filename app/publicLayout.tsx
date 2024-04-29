import { Footer } from '@/components/footer/footer'
import { Header } from '@/components/header/header'
import React from 'react'

type Props = {
  children: React.ReactNode
}
export default function PublicLayout({ children }: Props) {
  
  return (
    <main className='relative overflow-hidden pb-14'>
      <Header />
      <div className='min-h-[40vh]'>
        {children}
      </div>
      <Footer />
    </main>
  )
}
