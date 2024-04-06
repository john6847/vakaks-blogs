import BlogCard from '@/components/blog/blog-card'
import { BlogSkeleton } from '@/components/blog/blog-skeleton'
import SearchAndSort from '@/components/blog/search-and-sort'
import { getBlogs } from '@/lib/services/blogs/actions'
import { Blog } from '@/lib/services/blogs/type'
import { SearchParams } from '@/type/type'
import React, { Suspense } from 'react'

export default async function page({ searchParams }: SearchParams) {

  console.log(searchParams)

  const blogs: Blog[] = await getBlogs(16)

  return (
    <main className=''>
      <div className='bg-accent h-[17rem] pb-8 -mt-40 flex justify-center rounded-b-3xl items-end'>
        <h1 className='text-7xl font-semibold text-center'>
          OUR BLOGS
        </h1>
      </div>
      <div className='2xl:container mx-auto sm:p-8 p-4 sm:mb-16 mb-8'>

        <Suspense fallback={<BlogSkeleton />}>
          <div className='space-y-4'>
            <h2 className='text-xl font-light mt-8'>Search and Sort Blogs</h2>
            <SearchAndSort />
          </div>

          <div className='grid md:gap-8 gap-4 grid-responsive my-8'>
            {
              blogs && blogs.map((blog: Blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))
            }
          </div>
        </Suspense>
      </div>
    </main>
  )
}
