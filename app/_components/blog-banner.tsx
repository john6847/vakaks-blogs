import BlogCard from '@/components/blog/blog-card'
import { Blog } from '@/lib/services/blogs/type'
import React from 'react'
import bannerImg from '@/public/images/software-developer-read.jpeg'
import Image from 'next/image'

type Props = {
  blogs: Blog[]
  title?:any
  quantity?: number
  children?: React.ReactNode
}
export default function BlogBanner({ title, blogs, quantity=2, children }: Props) {

  return (
    <section className='sm:space-y-8 space-y-4 pb-8'>
      {title && <h1 className='sm:text-5xl w-full text-center text-3xl font-semibold sm:my-8 my-4'>
        {title}
      </h1>}
      {children}
      <div className='grid md:gap-8 gap-4 lg:grid-cols-5'>
        <div className='overflow-hidden lg:col-span-2 h-full'>
          <Image src={bannerImg} alt='hero' 
            width={1260} height={960}
            className='rounded-xl object-cover md:min-h-[26rem] lg:h-full md:h-64 h-44 transition-3 -scale-x-100 object-center '
          />
        </div>
        <div className='grid sm:grid-cols-2 lg:col-span-3 md:gap-8 gap-4'>
          {
            blogs && blogs.toReversed().slice(0, quantity).map((blog: Blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))
          }
        </div>
      </div>

    </section>
  )
}


