"use client";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

type Props = {
  navLinks: string[]
}

export default function SearchAndSort() {

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const search = searchParams?.get('search') || ''
  const sort = searchParams?.get('sort') || 'newest'

  const createQueryString = React.useCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams?.toString())
    params.set(name, value.toLowerCase())
    return params.toString()
  }, [searchParams])

  const handleSearch = (e: any) => {
    e.preventDefault()
    const search = e.target.value
    if (!search) {
      const params = new URLSearchParams(searchParams?.toString())
      params.delete('search')
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
      return
    }
    router.push(`${pathname}?${createQueryString('search', search)}`, { scroll: false })
  }

  const handleCategory = (category: string) => {
    if (category === 'all' || !category) {
      const params = new URLSearchParams(searchParams?.toString())
      params.delete('category')
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
      return
    }
    router.push(`${pathname}?${createQueryString('category', category)}`, { scroll: false })
  }

  const handleSort = (sort: string) => {
    if (sort === 'newest' || !sort || sort === 'newest') {
      const params = new URLSearchParams(searchParams?.toString())
      params.delete('sort')
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
      return
    }
    router.push(`${pathname}?${createQueryString('sort', sort)}`, { scroll: false })
  }

  return (
    <div className='flex flex-wrap justify-between gap-x-8 gap-y-4 w-full bg-accent rounded-md sm:p-6 p-4 '>
      <div className='flex flex-wrap gap-x-8 gap-y-4 items-center'>
        <div className='flex gap-4 items-center'>
          <span className='block text-sm font-semibold'>Sort By:</span>
          <select name="sort" id="sort" 
            value={sort} onChange={(e) => handleSort(e.target.value)}
            className='bg-accent text-accent-foreground'>
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
        <div className='flex gap-4 items-center'>
          <span className='block text-sm font-semibold'>Category:</span>
          <select name="category" id="category" 
            value={searchParams?.get('category') || 'all'} onChange={(e) => handleCategory(e.target.value)}
          className='bg-accent text-accent-foreground'>
            <option value="all">All</option>
            <option value="nextjs">NextJS</option>
            <option value="react">React</option>
            <option value="tailwindcss">TailwindCSS</option>
            <option value="web-development">Web Development</option>
          </select>
        </div>
      </div>
      <div className='flex gap-2 items-baseline'>
        <span className='block text-sm font-semibold'>Search:</span>
        <input type="text"
          placeholder='Search Blogs'
          onChange={handleSearch}
         className='bg-accent text-accent-foreground border-foreground border-opacity-50 border px-2 py-0 outline-none rounded-sm' />
      </div>
    </div>
  )
}