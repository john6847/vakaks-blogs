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
import dynamic from 'next/dynamic'
import { Textarea } from '../ui/textarea'
import { toast } from 'react-toastify'

const HtmlEditor = dynamic(() => import('@/components/htmlEditor/html-editor'), { ssr: false })

const formSchema = z.object({
  title: z.string().min(3, {
    message: "The title must be at least 3 characters.",
  }),
  category: z.string().min(2, {
    message: "The category must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "The description must be at least 10 characters.",
  }),
  content: z.string().min(300, {
    message: "The content must be at least 300 characters.",
  }),
})


type Props = {
  handleSubmit?: any;
}
function AddBlogForm({ handleSubmit }: Props) {
  

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      content: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if(handleSubmit){
      handleSubmit(values).then(() => {
        form.reset()
        toast.success('Blog added successfully!')
      }).catch((error: any) => {
        toast.error('An error occurred while adding the blog.')
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-lg font-normal opacity-90">
                Blog Title
              </FormLabel>
              <FormControl>
                <Input className="text-2xl px-2 py-4" placeholder="What the title of your blog?"
                  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-lg font-normal opacity-90">
                Choose a category or create a new one
              </FormLabel>
              <FormControl>
                <Input className="text-2xl px-2 py-4" placeholder="Software Development"
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
              <Textarea className='text-lg' placeholder="Type a short description of your blog"
                {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-lg font-normal opacity-90">
                The content of your blog
              </FormLabel>
              <FormControl className='min-h-[25rem]'>
                <HtmlEditor {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}


export default React.memo(AddBlogForm)