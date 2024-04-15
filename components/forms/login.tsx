"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { signIn } from "next-auth/react"
import Link from 'next/link'


const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address!"
  }),
  password: z.string().min(8,
    { message: "Password must be at least 8 characters long." }
  ),
})
export default function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {

    await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
    },).then((res) => {
      if (res?.ok) {
        alert("Success")

      }
      if (res?.error) {
        alert(res.error)
      }
      form.reset()
    }).catch((err) => {
      alert(err)
    }).finally(() => {
      
    })
  }

  return (
    <div>
      <Form {...form}>
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
        <div className="w-full max-w-sm">
          <Separator className="my-8" />
          <Button className="w-full" variant="outline">
            Sign in with Google
          </Button>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?
            <Link className="underline" href="#">
              Sign Up
            </Link>
          </div>
        </div>
      </Form>
    </div>
  )
}
