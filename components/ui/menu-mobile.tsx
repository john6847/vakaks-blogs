"use client"
import * as React from "react"
import { LucideMenu } from "lucide-react"
import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Props = {
  children?: React.ReactNode
}
export function MenuMobile( { children }: Props) {


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <LucideMenu className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* <Label className='opacity-40 mt-3 block'>Theme</Label>
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
        <Separator className='my-2' /> */}
        {children}
        
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
