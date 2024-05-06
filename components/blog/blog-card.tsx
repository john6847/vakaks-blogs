import { Blog } from '@/lib/services/blogs/type'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  blog: Blog
  className?: string
}
export default function BlogCard({ blog, className }: Props) {
  return (
    <div className={cn('bg-accent overflow-hidden rounded-xl p-2 fade-in ', className)}>
      <Link href={`/articles/${blog.id}`} className='block h-52 relative overflow-hidden'>
        <Image
          src={blog.cover} loading='lazy'
          alt="Blog Cover"
          width={500} height={500}
          className='w-full rounded-lg h-full object-cover' />
      </Link>
      <div className='pt-3 pb-1 space-y-1 text-left sm:h-[45%]'>
        <div className='flex gap-4 justify-between opacity-70'>
          <span className='text-xs font-semibold block'>{blog.author.displayName}</span>
          <span className='text-xs block'> {blog.publishedAt.toDate().toDateString()}</span>
        </div>
        <div className='py-2 sm:h-full flex justify-between flex-col'>
          <div>
            <h1 className='leading-tight font-sans text-lg m-0 line-clamp-2'>
              <Link href={`/articles/${blog.id}`}>
                {blog.title}
              </Link>
            </h1>
            <p className='font-sans text-sm line-clamp-3 opacity-70'>
              {blog.shortDescription}
            </p>
          </div>
          <Link href={`/articles/${blog.id}`} className='flex mt-4 justify-center items-center gap-1 hover:gap-2 w-full transition-5 bg-background text-foreground text-center rounded-md p-2'>
            Read More <ArrowRight size={20} className='transition-10'/>
          </Link>
        </div>
      </div>
    </div>
  );
}
