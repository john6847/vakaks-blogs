import React from 'react'
import dynamic from 'next/dynamic'
import { saveBlog } from '@/lib/services/blogs/actions'
import { Blog } from '@/lib/services/blogs/type'


const AddBlogForm = dynamic(() => import('@/components/blog/add-blog-form'), { ssr: false })

export default async function page() {

  const handleSubmit = async (values: any) => {
    "use server"

    const handleCategories = (value: string) => {
      if(!value || value.length < 1) return []
      return value.split(',').map((v) => v.replaceAll('  ', ' ').trim())
    }

    const blog = {
      title: values.title,
      content: values.content,
      shortDescription: values.description,
      cover: 'https://images.unsplash.com/photo-1545670723-196ed0954986',
      categories: handleCategories(values.categories),
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
