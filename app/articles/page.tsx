import BlogCard from '@/components/blog/blog-card'
import { BlogSkeleton } from '@/components/blog/blog-skeleton'
import SearchAndSort from '@/components/blog/search-and-sort'
import { CustomPagination } from '@/components/pagination/custom-pagination'
import { getBlogsByCategory, numberOfBlogs } from '@/lib/services/blogs/actions'
import { Blog } from '@/lib/services/blogs/type'
import { getCategories } from '@/lib/services/categories/actions'
import { SearchParams } from '@/types'
import React, { Suspense } from 'react'

export default async function page({ searchParams }: SearchParams) {

  const { category, page, sort } = searchParams

  const navLinks = await getCategories()
  navLinks.unshift('All')

  const order = sort==="asc" ? sort : 'desc'
  const totalAvailable = await numberOfBlogs()
  const numPage = page ? parseInt(page)*8 : 8

  const blogs: Blog[] = await getBlogsByCategory(category, numPage, order)

  return (
    <main className=''>
      <div className='bg-accent h-[17rem] pb-8 -mt-40 flex justify-center rounded-b-3xl items-end'>
        <h1 className='text-7xl font-semibold text-center'>
          OUR BLOGS
        </h1>
      </div>
      <div className='2xl:container mx-auto sm:p-8 p-4 sm:mb-16 mb-8 min-h-[35rem]'>

        <Suspense fallback={<BlogSkeleton />}>
          <div className='space-y-4'>
            <h2 className='text-2xl font-normal mt-8'>Search and Sort Blogs</h2>
            <SearchAndSort navLinks={navLinks}/>
          </div>

          <div className='grid md:gap-8 gap-4 grid-responsive my-8'>
            {
              blogs && blogs.map((blog: Blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))
            }

            
          </div>

          {
              blogs.length === 0 && <h2 className='text-center italic opacity-80 mx-auto my-16 h-full font-light text-xl'>No Blogs Found...</h2>
            }
        </Suspense>
      </div>
      <Suspense>
        <div className='2xl:container flex justify-center items-center -mt-16 mb-16'>
          <CustomPagination limit={
            Math.ceil(totalAvailable/4)
          }/>
        </div>
      </Suspense>
    </main>
  )
}
