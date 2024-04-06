import { Skeleton } from '@/components/ui/skeleton'
import { getBlog } from '@/lib/services/blogs/actions'
import { Blog } from '@/lib/services/blogs/type'
import Image from 'next/image'
import React, { Suspense } from 'react'
import defImg from '@/public/images/software-developer-read.jpeg'

export default async function page({ params }: { params: { blogId: string } }) {

  const id = params?.blogId || ''
  const blog: Blog = await getBlog(id)

  const getBannerImgUrl = () => {
    const isValidUrl = (url: string) => {
      try {
        new URL(url)
        return true
      } catch (error) {
        return false
      }
    }
    if (isValidUrl(blog.cover)) return blog.cover
    return defImg.src
  }


  return (
    <Suspense fallback={<LoadindSkeleton />}>

      {
        blog && <div className='min-h-[40rem] max-h-[45rem] -mt-52 rounded-lg overflow-hidden relative'>
        <Image loading='lazy'
          width={1920} height={1080}
          src={getBannerImgUrl()} alt="cover image"
          className='w-full h-full min-h-[40rem] max-h-[45rem] object-cover' />

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
      }

      {blog ? <div className='2xl:container 2xl:mx-auto py-8 space-y-8 sm:p-8 p-4'>


        



        <div className='space-y-4 sm:px-16 px-6 italic'>
          <blockquote className='text-xl text-center'>
            {blog.shortDescription}
          </blockquote>
        </div>


        <div className='html-content' dangerouslySetInnerHTML={{ __html: blog.content }} />


      </div>
        : <div className='text-center my-16'>
          <h1 className='text-3xl font-semibold'>Blog not found</h1>
          <p className='text-lg'>The blog you are looking for does not exist</p>
        </div>
      }
    </Suspense>
  )
}



const LoadindSkeleton = () => {
  return (
    <div className="flex flex-col space-y-8 mx-4 2xl:container 2xl:mx-auto">
      <Skeleton className="min-h-[30rem] max-h-[25rem] rounded-xl" />
      <Skeleton className="h-32 rounded-xl mx-auto w-10/12" />
      <div className="space-y-2 sm:mx-16">
        <Skeleton className="min-h-[20rem] w-full" />
        <Skeleton className="h-[40rem] w-full" />
      </div>
    </div>
  )
}