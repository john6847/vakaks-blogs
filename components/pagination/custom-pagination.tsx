"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

type Props = {
  className?: string;
  limit?: number;
}
export function CustomPagination({ className, limit = 13 }: Props) {

  const router = useRouter()
  const pathname = usePathname()

  
  const searchParams = useSearchParams()

  const currentPage = searchParams?.get('page') || '0'


  const createQueryString = React.useCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams?.toString())
    params.set(name, value)
    return params.toString()
  }, [searchParams])

  const handlePrevious = () => {
    const page = currentPage && parseInt(currentPage) > 1 ? parseInt(currentPage) - 1 : 0
    if (page === 0) {
      router.push(`${pathname}`)
      return  
    }
    router.push(`${pathname}?${createQueryString('page', page.toString())}`, { scroll: false })
  }

  const handleNext = () => {
    const page = currentPage && parseInt(currentPage) < limit ? parseInt(currentPage) + 1 : limit
    router.push(`${pathname}?${createQueryString('page', page.toString())}`, { scroll: false })
  }

  return (
    <div className='bg-background w-full sm:max-w-4xl overflow-hidden'>

      <Pagination>
        <PaginationContent>
          
          <PaginationItem className='cursor-pointer'>
            <PaginationPrevious 
            onClick={handlePrevious}
            />
          </PaginationItem>

          {
            Array.from({ length: limit }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink className='cursor-pointer'  isActive={currentPage === (index + 1).toString()}
                  onClick={() => router.push(`${pathname}?${createQueryString('page', (index + 1).toString())}`)}
                >{index + 1}</PaginationLink>
              </PaginationItem>
            ))
          }


          {/* <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem> */}


          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem className='cursor-pointer'>
            <PaginationNext 
              onClick={handleNext}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
