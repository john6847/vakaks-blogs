import BlogCard from '@/components/blog/blog-card'
import { BlogSkeleton } from '@/components/blog/blog-skeleton'
import { Blog } from '@/lib/services/blogs/type'
import { SquareArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import React, { Suspense } from 'react'

type Props = {
  blogs: Blog[]
  title?: string
  children?: React.ReactNode
  quantity?: number
}
export default function BlogSection({ title, blogs, quantity = 4, children }: Props) {

  if (!blogs || blogs.length === 0) {
    return <section className='space-y-8'>
      {title && <h1 className='sm:text-5xl text-3xl font-semibold font-sans sm:mt-8 mt-4'>
        {title}
      </h1>}
      <p className='text-center text-lg my-8'>No blogs found</p>
    </section>
  }

  return (
    <section className='space-y-8'>
      {title && <h1 className='sm:text-5xl text-3xl font-semibold font-sans sm:mt-8 mt-4'>
        {title}
      </h1>}
      {children}
      <Suspense fallback={<BlogSkeleton />}>
        <div className='grid md:gap-8 gap-4 grid-responsive'>
          {
            blogs && blogs.slice(0, quantity).map((blog: Blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))
          }
        </div>
      </Suspense>
      <div className='w-full grid place-items-center mt-8 pb-10'>
        <Link href='/blogs' className='flex items-center gap-2 hover:gap-3 transition-3 text-background bg-foreground text-center rounded-md py-2 px-4'>
          View all Blogs <SquareArrowUpRight size={24} />
        </Link>
      </div>

    </section>
  )
}


