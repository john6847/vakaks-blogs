import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl">
          404 - Page Not Found
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          href="/">
          Go back home
        </Link>
      </div>
    </div>
  )
}
