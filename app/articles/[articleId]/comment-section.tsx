import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Blog } from '@/lib/services/blogs/type'
import { SendHorizonal, User } from 'lucide-react'
import React from 'react'

type Props = {
  blog: Blog
}
export default function CommentSection({ blog }: Props) {
  return (
    <div className='sm:mx-auto mx-4 max-w-5xl my-8 space-y-6'>
      <h2 className='text-xl font-semibold'>Comments</h2>
      <div className='space-y-2'>
        <div className='flex gap-2'>
          <User size={32} className='bg-foreground min-w-8 min-h-8 text-background p-1 rounded-full sm:mt-2' />
          <Textarea />
        </div>
        <div className='flex justify-end items-end'>
          <Button className='flex items-center gap-2 hover:gap-3 transition-3'>Comment <SendHorizonal size={18} /> </Button>
        </div>
      </div>
      <hr className='border-accent border' />

      <div>

      </div>


      <div className='flex flex-col gap-2  max-w-3xl'>
        <div className='flex gap-1'>
          <User size={24} className='bg-foreground text-background block min-w-6 min-h-6 p-1 mt-1 rounded-full' />
          <div className='rounded-md space-y-2 gap-4 bg-accent p-4'>
            <h2 className='font-bold text-xs block'>John Doe</h2>
            <p className='text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed sit amet felis in turpis lacinia aliquet. Nullam et purus nec risus lacinia aliquet.
            </p>
          </div>
        </div>

        <div className='flex items-center gap-2 pl-8 font-bold'>
          <span className='text-xs block'> 1 day ago</span>
          <span title='Like' className='text-xs block cursor-pointer'> Like</span>
          <span title='Reply' className='text-xs block cursor-pointer'> Reply</span>
        </div>

      </div>

    </div>
  )
}
