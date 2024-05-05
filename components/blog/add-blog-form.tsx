"use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from '../ui/textarea'
import { toast } from 'react-toastify'
import HtmlEditor from '@/components/htmlEditor/html-editor'
import DropZone from './drop-zone'
import { SelectSearch } from '../ui/select-search'
import { useSession } from '@/hooks/useSession'
import { Blog } from '@/lib/services/blogs/type'
import { saveBlog } from '@/lib/services/blogs/actions'

const formSchema = z.object({
  description: z.string().min(103, {
    message: "The description must be at least 103 characters.",
  }).max(254, {
    message: "The description must be at most 254 characters.",
  }),
  category: z.string().min(2, {
    message: "The category must be at least 2 characters.",
  }),
  title: z.string().min(10, {
    message: "The title must be at least 10 characters.",
  }),
  content: z.string().min(300, {
    message: "The content must be at least 300 characters.",
  }),
  cover: z.string().min(10, {
    message: "The cover image is required.",
  })
})


type Props = {
  categories: string[];
}
function AddBlogForm({ categories }: Props) {

  const { user } = useSession()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      content: "",
      cover: ""
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {

    const handleCategories = (value: string) => {
      if (!value || value.length < 1) return []
      return value.split(',').map((v) => v.replaceAll('  ', ' ').trim())
    }

    const blogData = {
      title: values.title,
      content: values.content,
      shortDescription: values.description,
      cover: values.cover,
      categories: handleCategories(values.category),
      author: user
    } as Blog

    saveBlog(blogData).then(() => {
      form.reset()
      toast.success('Blog added successfully!')
    }).catch((error: any) => {
      toast.error('An error occurred while adding the blog.')
    })

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="gap-8 space-y-8 md:space-y-0 md:mt-16 md:grid md:grid-cols-2">

        <div className='space-y-4'>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-lg font-normal opacity-90">
                  Title
                </FormLabel>
                <FormControl>
                  <Input className="text-base px-2 py-4" placeholder="What the title of your blog?"
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-lg font-normal opacity-90">
                  Short Description
                </FormLabel>
                <FormControl>
                  <Textarea className='text-base h-full min-h-[11.5rem]'
                    maxLength={254}
                    minLength={103}
                    placeholder="Type a short description of your blog"
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='space-y-4'>
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel htmlFor='category' className="text-lg font-normal opacity-90">
                  Choose a category or create a new one
                </FormLabel>
                <FormControl>
                  <div>
                    <SelectSearch data={categories}
                      onChange={(value: string) => {
                        field.onChange(value.toLowerCase())
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cover"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-lg font-normal opacity-90">
                  Upload a cover image
                </FormLabel>
                <FormControl>
                  <DropZone {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>


        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="space-y-1 col-span-2">
              <FormLabel className="text-lg font-normal opacity-90">
                Content
              </FormLabel>
              <FormControl className='min-h-[25rem]'>
                <HtmlEditor {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex items-center justify-center col-span-2'>
          <Button className='min-w-[50%]' type="submit">
            {form.formState.isValidating ? 'Adding...' : 'Add Blog'}
          </Button>
        </div>
      </form>
    </Form>
  )
}


export default React.memo(AddBlogForm)