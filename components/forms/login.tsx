"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { signIn, useSession, signOut } from "next-auth/react"
import { signInWithEmailAndPassword, signOut as logout } from 'firebase/auth'
import { auth } from '@/lib/config/firebase-client'
import { redirect } from 'next/dist/server/api-utils'


const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address!"
  }),
  password: z.string().min(8,
    { message: "Password must be at least 8 characters long." }
  ),
})
export default function LoginForm() {

  const { data } = useSession()
  const isLogged = data && data?.user && data?.user?.uid ? true : false
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password } = values

    const response = await signInWithEmailAndPassword(auth, email, password)
    const { user } = response

    if (user) {
      await signIn('credentials', {
        redirect: true,
        callbackUrl: "/",
        email: email,
      },).then((res) => {
        if (res?.ok) {
          alert('Logged in successfully')
          form.reset()
        }
        if (res?.error) {
          alert(res.error)
        }
      }).catch((err) => {
        alert(err)
      }).finally(() => {

      })
    }
  }

  const handleLogout = async() => {
    await logout(auth)
    await signOut({ redirect: false, callbackUrl: "/"})
  }

  console.log(auth.currentUser)
  
  return (
    <div>
      {
        isLogged && <div className='flex flex-col items-center justify-center gap-6'>
          <h1>You are already logged in</h1>
          <Button onClick={handleLogout}>
            Logout
          </Button>
        </div>
      }
      {!isLogged && <Form {...form}>
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

          <Button className="w-full">Sign In</Button>
        </form>

      </Form>}
    </div>
  )
}
