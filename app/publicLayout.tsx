import { Header } from '@/components/header/header'
import Image from 'next/image'
import React from 'react'
import bannerImg from '@/public/images/software-developer-0.jpeg';

type Props = {
  children: React.ReactNode
}
export default function PublicLayout({ children }: Props) {
  return (
    <main className='relative overflow-hidden pb-14'>
      <Header />
      <Image src={bannerImg} alt='hero' 
          width={1920} height={1270} 
            className='absolute min-h-[35rem] h-[50vh] mb-35 w-full rounded-b-3xl -z-0 top-0 bottom-0 left-0 right-0 object-cover object-center' />
        {children}
    </main>
  )
}
