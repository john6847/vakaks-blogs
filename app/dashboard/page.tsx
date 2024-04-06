/* import HtmlEditor from '@/components/htmlEditor/html-editor' */
import React from 'react'
import dynamic from 'next/dynamic'
import { saveBlog } from '@/lib/services/blogs/actions'
import { Blog } from '@/lib/services/blogs/type'
/* import AddBlogForm from '@/components/blog/add-blog-form' */


const AddBlogForm = dynamic(() => import('@/components/blog/add-blog-form'), { ssr: false })

export default async function page() {
  /* const blog = {
    title: 'THE LATEST BLOG',
    content: '<>This is the content of the blog</>',
    cover: 'https://placekitten.com/200/300',
    categoryIds: ['Tech', 'Programming', 'Web Development'],
  }

  await saveBlog(blog as any) */

  const handleSubmit = async (values: any) => {
    "use server"
    const blog = {
      title: values.title,
      content: values.content,
      shortDescription: values.description,
      cover: 'https://images.unsplash.com/photo-1545670723-196ed0954986',
      categoryIds: [values.category],
    } as Blog
    await saveBlog(blog)
  }


  return (
    <main className='2xl:container mx-auto sm:p-8 p-4'>
      <h1 className='text-7xl font-semibold text-center'>VAKAKS BLOG</h1>
      <AddBlogForm handleSubmit={handleSubmit}/>
    </main>
  )
}
