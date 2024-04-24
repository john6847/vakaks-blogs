import React, { Suspense } from 'react'
import { FormAuth } from './form-auth'

export default function page() {
  return (
    <div className='grid place-items-center p-8 min-h-[50vh]'>
      <FormAuth />
    </div>
  )
}
