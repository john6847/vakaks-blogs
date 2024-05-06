"use client"
import { formatNumberToNk } from '@/helpers'
import { DbCollection } from '@/lib/config/collections'
import { db } from '@/lib/config/firebase-client'
import { Blog } from '@/lib/services/blogs/type'
import { doc, setDoc, Timestamp } from 'firebase/firestore'
import { Heart, Share } from 'lucide-react'
import React from 'react'

type Props = {
  blog: Blog
  handleLike: any
}
export default function Options({ blog, handleLike }: Props) {

  const likes= blog.reactions?.LIKE || 0

  const likeBlog = async () => {
    await setDoc(doc(db, DbCollection.BLOGS, blog.id), {
      ...blog,
      publishedAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      reactions: {
        ...blog.reactions,
        LIKE: blog.reactions.LIKE + 1
      }
    });
    await handleLike()
  }

  return (
    <div className='fixed z-40 bottom-[45%] right-0 text-background flex  rounded-full mx-auto'>
      <div className='w-fit bg-destructive rounded-l-xl justify-center pr-2 pl-4 py-6 flex flex-col items-center gap-4'>
        <span title='Share' className='block cursor-pointer text-sm font-semibold'><Share size={18} /> </span>
        {/* <Link href="#comments-section" title='Comments' className='block cursor-pointer text-sm font-semibold'>
          <MessageCircle size={18} />
        </Link> */}
        <span title="Like" className='block cursor-pointer relative text-sm font-semibold'>
          <Heart size={18} onClick={likeBlog} className='transition-3 hover:scale-110'/> 
          <span 
            style={{ fontSize: '0.6rem' }}
          className='absolute -bottom-4 left-1/2 -translate-x-1/2  rounded-full px-1'>{
            formatNumberToNk(likes)
          }</span>
        </span>
      </div>
    </div>
  )
}
