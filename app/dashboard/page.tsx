import React from 'react'
import dynamic from 'next/dynamic'
import { saveBlog } from '@/lib/services/blogs/actions'
import { Blog } from '@/lib/services/blogs/type'
import { getCategories } from '@/lib/services/categories/actions'


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
      cover: values.cover,
      categories: handleCategories(values.category),
      author: values.author,
    } as Blog

    await saveBlog(blog)
  }

  const categories = await getCategories()

  return (
    <main className='2xl:container mx-auto sm:px-8 px-4 -mt-36 sm:pt-48 pt-40 pb-16 bg-accent'>
      <h1 className='sm:text-7xl text-4xl font-semibold md:mb-0 mb-8'>
        Add a new blog
      </h1>
      <AddBlogForm handleSubmit={handleSubmit} categories={categories}/>
    </main>
  )
}
