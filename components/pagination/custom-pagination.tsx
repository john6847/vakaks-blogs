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
  limit?: number;
}
export function CustomPagination({ limit = 5 }: Props) {

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentPage = searchParams?.get('page') || '1'


  const createQueryString = React.useCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams?.toString())
    params.set(name, value)
    return params.toString()
  }, [searchParams])

  const handlePrevious = () => {
    const page = currentPage && parseInt(currentPage) > 1 ? parseInt(currentPage) - 1 : 0
    if (page === 0) {
      router.push(`${pathname}`, { scroll: false })
      return  
    }
    router.push(`${pathname}?${createQueryString('page', page.toString())}`, { scroll: false })
  }

  const isLastPage = currentPage && parseInt(currentPage) === limit
  const isFirstPage = currentPage && parseInt(currentPage) === 1

  const handleNext = () => {
    const page = currentPage && parseInt(currentPage) < limit ? parseInt(currentPage) + 1 : limit
    router.push(`${pathname}?${createQueryString('page', page.toString())}`, { scroll: false })
  }

  return (
    <div className='bg-background w-full sm:max-w-4xl overflow-hidden'>

      <Pagination>
        <PaginationContent>
          
          <PaginationItem className={isFirstPage ? 'cursor-not-allowed': 'cursor-pointer'}
            aria-disabled={isFirstPage ? true : false}>
            <PaginationPrevious aria-disabled={isFirstPage ? true : false}
            onClick={handlePrevious}
            />
          </PaginationItem>

          {/* {
            Array.from({ length: limit }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink className='cursor-pointer'  isActive={currentPage === (index + 1).toString()}
                  onClick={() => router.push(`${pathname}?${createQueryString('page', (index + 1).toString())}`)}
                >{index + 1}</PaginationLink>
              </PaginationItem>
            ))
          } */}
          <PaginationItem>
            {/* <PaginationEllipsis /> */}

            <div className='flex space-x-2 px-4 border-x'>
              <span>
                {currentPage } of {limit}
              </span>
            </div>

          </PaginationItem>

          <PaginationItem className={isLastPage ? 'cursor-not-allowed': 'cursor-pointer'}
            aria-disabled={isLastPage ? true : false}
          >
            <PaginationNext 
              aria-disabled={isLastPage ? true : false}
              onClick={handleNext}
            />
          </PaginationItem>

        </PaginationContent>
      </Pagination>
    </div>
  )
}
