import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { SendHorizonal, User } from 'lucide-react'
import React from 'react'

export default function CommentSection() {
  return (
    <div className='sm:mx-auto mx-4 max-w-5xl my-8 space-y-4'>
      <h2 className='text-xl font-semibold'>Comments</h2>
      <div className='space-y-2'>
        <div className='flex gap-2'>
          <User size={32} className='bg-foreground text-background p-1 rounded-full' />
          <Textarea />
        </div>
        <div className='flex justify-end items-end'>
          <Button className='flex items-center gap-2 hover:gap-3 transition-3'>Comment <SendHorizonal size={18}/> </Button>
        </div>
      </div>
      <hr className='border-accent' />
      <div>

      </div>
      <div className='flex flex-col gap-4 bg-accent sm:px-16 p-4 rounded-xl '>
        <div className='flex flex-col gap-1'>
          <div className='flex items-start gap-2'>
            <User size={18} className='bg-foreground text-background p-1 mt-1 rounded-full' />
            <div>
              <span className='font-bold text-xs block'>John Doe</span>
              <span className='text-xs block'> 1 day ago</span>
            </div>
          </div>
          <p className='text-sm p-4 bg-background rounded-md'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed sit amet felis in turpis lacinia aliquet. Nullam et purus nec risus lacinia aliquet.
          </p>
        </div>
        
      </div>

    </div>
  )
}
