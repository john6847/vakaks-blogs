"use client"
import { Heart, MessageCircle, Share } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
  blogId: string
}
export default function Options({ blogId }: Props) {
  return (
    <div className='fixed z-40 bottom-[45%] right-0 text-background flex  rounded-full mx-auto'>
      <div className='w-fit bg-foreground rounded-l-xl justify-center px-2 py-4 flex flex-col items-center gap-4'>
        <span title='Share' className='block cursor-pointer text-sm font-semibold'><Share size={18} /> </span>
        <Link href="#comments-section" title='Comments' className='block cursor-pointer text-sm font-semibold'>
          <MessageCircle size={18} />
        </Link>
        <span title="Like" className='block cursor-pointer text-sm font-semibold'><Heart size={18} /> </span>
      </div>
    </div>
  )
}
