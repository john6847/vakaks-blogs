import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

type Props = {
  className?: string
  svgClassName?: string
  url: string
  name: "LinkedIn" | "Youtube" | "Facebook" | "Instagram" | "Twitter" | "Threads" | "Website" | string
}
export function SocialMediaIcon({
  className,
  svgClassName='sm:w-5 w-4 sm:h-5 h-4',
  url,
  name
}: Props) {

  const icon = getIconSvg(name, svgClassName)
  if (!icon) return null

  return (
    <Link title={name.toUpperCase()} target='_blank' href={url} className={cn('block bg-background rounded-full p-1 ', className)}>
      {icon}
    </Link>
  )
}


const getIconSvg = (name: string, className?:string) => {
  switch (name) {
    case 'LinkedIn':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={cn("stroke-current icon icon-tabler icon-tabler-brand-linkedin", className)} viewBox="0 0 24 24" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
          <path d="M8 11l0 5" />
          <path d="M8 8l0 .01" />
          <path d="M12 16l0 -5" />
          <path d="M16 16v-3a2 2 0 0 0 -4 0" />
        </svg>
      )
    case 'Youtube':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={cn("stroke-current icon icon-tabler icon-tabler-world", className)} viewBox="0 0 24 24" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
          <path d="M3.6 9h16.8" />
          <path d="M3.6 15h16.8" />
          <path d="M11.5 3a17 17 0 0 0 0 18" />
          <path d="M12.5 3a17 17 0 0 1 0 18" />
        </svg>
      )
    case 'Facebook':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={cn("stroke-current icon icon-tabler icon-tabler-brand-facebook", className)} viewBox="0 0 24 24" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
        </svg>
      )
    case 'Instagram':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={cn("stroke-current icon icon-tabler icon-tabler-brand-instagram", className)} viewBox="0 0 24 24" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
          <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M16.5 7.5l0 .01" />
        </svg>
      )
    case 'Twitter':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={cn("stroke-current icon icon-tabler icon-tabler-brand-x", className)} viewBox="0 0 24 24" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
          <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
        </svg>
      )
    case 'Threads':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={cn("stroke-current icon icon-tabler icon-tabler-brand-threads", className)} viewBox="0 0 24 24" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M19 7.5c-1.333 -3 -3.667 -4.5 -7 -4.5c-5 0 -8 2.5 -8 9s3.5 9 8 9s7 -3 7 -5s-1 -5 -7 -5c-2.5 0 -3 1.25 -3 2.5c0 1.5 1 2.5 2.5 2.5c2.5 0 3.5 -1.5 3.5 -5s-2 -4 -3 -4s-1.833 .333 -2.5 1" />
        </svg>
      )
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={cn("stroke-current icon icon-tabler icon-tabler-world", className)} viewBox="0 0 24 24" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
          <path d="M3.6 9h16.8" />
          <path d="M3.6 15h16.8" />
          <path d="M11.5 3a17 17 0 0 0 0 18" />
          <path d="M12.5 3a17 17 0 0 1 0 18" />
        </svg>
      )
  }
}
