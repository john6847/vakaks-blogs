import React, { Suspense } from 'react'
import { FormAuth } from './form-auth'
import LoginForm from '@/components/forms/login'

export default function page() {
  return (
    <div className='grid place-items-center p-8 min-h-[50vh]'>
      <FormAuth />
      {/* <LoginForm /> */}
    </div>
  )
}
