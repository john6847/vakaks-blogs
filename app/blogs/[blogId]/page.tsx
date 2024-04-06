import { getBlog } from '@/lib/services/blogs/actions'
import { Blog } from '@/lib/services/blogs/type'
import Image from 'next/image'
import React from 'react'

export default async function page({ params }: { params: { blogId: string } }) {

  const id = params.blogId[0] || ''
  const blog: Blog = await getBlog(id)


  return (
    <>

      {blog && <div className='2xl:container 2xl:mx-auto py-8 space-y-8 sm:p-8 p-4'>
        <div className='min-h-[20rem] max-h-[30rem] -mt-8 rounded-lg overflow-hidden relative'>
          <Image loading='lazy'
            width={1920} height={1080}
            src={blog?.cover} alt="cover image"
            className='w-full h-full blur-sm min-h-[30rem] max-h-[25rem] object-cover' />

          <div className='absolute bottom-[0%] z-10 left-0 right-0'>


            <div className='flex items-start gap-4 sm:px-8 px-4'>
              <Image className='w-32 h-32 object-cover rounded-md'
                src={blog.author.photoURL || ''} alt={blog.title} width={200} height={300} />

              <div className='grid'>
                <h1 className=''>
                  {blog.title}
                </h1>
                <span className='text-2xl font-semibold block'>{blog.author.displayName}</span>
                <span className='text-base font-bold block'>{blog.categoryIds.join(' | ')}</span>
                <span className='text-sm font-medium block'>
                  {new Date(blog.publishedAt.toDate()).toDateString()}
                </span>
              </div>
            </div>
          </div>

          <span className='absolute bottom-0 h-[60%] left-0 right-0 bg-gradient-to-t from-background to-transparent p-4' />
        </div>



        <div className='space-y-4 sm:px-16 px-6 italic'>
          <blockquote className='text-xl text-center'>
            {blog.shortDescription}
          </blockquote>
        </div>

        <div className='sm:p-8 p-4'>
          <div className='' dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>

      </div>}
    </>
  )
}
