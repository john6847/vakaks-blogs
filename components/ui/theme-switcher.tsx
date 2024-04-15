"use client"
import * as React from "react"
import { LucideMenu } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from './separator'
import { Label } from './label'
import { signIn, signOut } from 'next-auth/react'

type Props = {
  isLogged: boolean
}
export function ThemeSwitcher( { isLogged }: Props) {

  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <LucideMenu className="h-[1.2rem] w-[1.2rem]" />
          {/* <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" /> */}
          <span className="sr-only">Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Label className='opacity-40 mt-3 block'>Theme</Label>
        <Separator className='my-1' />
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
        <Label className='opacity-40 mt-3 block'>
          Authentification
        </Label>
        <Separator className='my-2' />
        {!isLogged ? <Button onClick={() => signIn()} className='block w-40'>
          Login with Google
        </Button>
          :
          <Button onClick={() => signOut()} className='block w-40 mt-2 hover:outline hover:outline-destructive hover:text-destructive' variant="destructive">
            Logout
          </Button>}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
