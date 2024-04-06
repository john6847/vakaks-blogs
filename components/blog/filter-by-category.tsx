"use client";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'


type Props = {
  navLinks: string[]
}
export default function FilterByCategory({navLinks}: Props) {

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentCategory = searchParams?.get('category') || 'all'

  const createQueryString = React.useCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams?.toString())
    params.set(name, value.toLowerCase())
    return params.toString()
  }, [searchParams])

  const handleCategory = (category: string) => {
    if(category === 'all' || !category || category === currentCategory) {
      const params = new URLSearchParams(searchParams?.toString())
      params.delete('category')
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
      return
    }
    router.push(`${pathname}?${createQueryString('category', category)}`, { scroll: false })
  }

  const isActive = (category: string) => {
    return currentCategory.trim().toLowerCase() === category.trim().toLowerCase() 
            ? 'bg-foreground text-background' : ' '
  }

  return (
    <nav>
      <ul className='flex items-center gap-x-5 gap-y-3 flex-wrap'>
        {
          navLinks.map((link, index) => (
            <li key={index} onClick={() => handleCategory(link.toLowerCase())} 
              className={`block px-3 py-1 rounded-full cursor-pointer transition-3 hover:bg-foreground hover:text-background bg-accent ${isActive(link)}`}>{link}</li>
          ))
        }
      </ul>
    </nav>
  )
}