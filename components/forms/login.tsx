"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSession } from '@/hooks/useSession'
import { logOut, signInWithCredencials } from '@/lib/auth'


const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address!"
  }),
  password: z.string().min(8,
    { message: "Password must be at least 8 characters long." }
  ),
  isLoanding: z.boolean().optional()
})
export default function LoginForm() {

  const { isAuthenticated, status } = useSession()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password } = values
    signInWithCredencials(email, password)
    .then(()=> window.location.reload())
    .catch((error)=> {
      form.setError('email', {
        type: 'manual',
        message: error.message
      })
      form.setError('password', {
        type: 'manual',
        message: error.message
      })
    })
  }

  const handleLogout = async() => {
    await logOut()
    window.location.reload()
  }
  
  return (
    <div>
      {
        isAuthenticated  && <div className='flex flex-col items-center justify-center gap-6'>
          <h1>You are already logged in</h1>
          <Button onClick={handleLogout}>
            Logout
          </Button>
        </div>
      }
      {!isAuthenticated  && <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm space-y-4">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Sign in to your account</h1>
            <p className="opacity-40">Enter your email and password to access your account</p>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>
                  Email
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email address"
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>
                  Password
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter your password"
                    type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full">
            {  form.formState.isSubmitting ? 'Loading...' : 'Sign in'}
          </Button>
        </form>

      </Form>}
    </div>
  )
}
