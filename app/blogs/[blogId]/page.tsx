import { Skeleton } from '@/components/ui/skeleton'
import { getBlog, likeBlog } from '@/lib/services/blogs/actions'
import { Blog } from '@/lib/services/blogs/type'
import Image from 'next/image'
import React, { Suspense } from 'react'
import defImg from '@/public/images/software-developer-post-1.jpeg'
import { CalendarDays, Tags } from 'lucide-react'
import { isValidUrl } from '@/helpers'
import Link from 'next/link'
import NewsLetter from '@/components/newsletter/news-letter'
import Options from './options'
import { headers } from 'next/headers'
import { revalidateTag } from 'next/cache'

const getBlogById = async (id: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  const url = `${baseUrl}/api/blogs/${id}`
  const response = await fetch(url, {
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    next: { tags: [`blogs-${id}`] }
  })

  if (response.ok) {
    const blog = await response.json()
    return blog as Blog
  }
  return null as any

}
export default async function page({ params }: { params: { blogId: string } }) {

  const { blogId } = params
  
  const blog: Blog = await getBlogById(blogId)

  if(!blog) return <div className='mx-auto container space-y-4 text-center text-xl py-32'>
    <h1>Blog Not Found</h1>
    <p>Sorry, the blog you are looking for does not exist</p>
    <Link href='/blogs'
      className='underline underline-offset-4 block w-fit mx-auto my-8 transition-3'> Back to Blogs</Link>

  </div>

  const getDate = () => {

    if (!blog.publishedAt) return new Date().toDateString()
    const date = new Date(blog.publishedAt.seconds * 1000)
    return date.toDateString()
  }

  const getBannerImgUrl = () => {
    if (isValidUrl(blog.cover)) return blog.cover
    return defImg.src
  }


  const handleLike = async () => {
    "use server"
    likeBlog(blog.id)
    revalidateTag(`blogs-${blogId}`)
  }


  return (
    <main className='mb-8 grid sm:gap-8 gap-4 pb-8'>

      <Suspense fallback={<LoadindSkeleton />}>

        <div className='-mt-40 pt-40 grid place-items-center bg-accent sm:min-h-[30rem] min-h-[25rem] w-full texture-polka-dots'>
          <div className='2xl:container 2xl:mx-auto sm:p-8 p-4 -mb-10'>
            <div className='relative'>
              <h1 className='sm:text-7xl text-2xl max-w-4xl font-semibold text-center col-span-3'>
                {blog.title}
              </h1>
              <div className='flex flex-wrap justify-center items-center mt-4 text-xs '>
                <span className='text-center flex items-center font-medium bg-accent px-3 py-2 gap-2'>
                  <CalendarDays size={14} /> {getDate()}
                </span>
              </div>
            </div>
          </div>
          <AuthorProfile {...{ blog }} />
        </div>

        <Options {...{blog}} handleLike={handleLike}/>

        <article className='2xl:container 2xl:mx-auto space-y-8 sm:px-8 px-4'>
          <summary className='transition-3 relative bg-accent sm:p-8 p-4 max-w-6xl mx-auto grid md:grid-cols-5 place-items-center md:gap-8 gap-4 transition-3 rounded-lg list-none'>

            <div className='md:col-span-3 md:block grid place-items-center'>
              <h2 className='sm:text-4xl flex flex-col font-anton text-lg md:text-left text-center'>
                <span className='font-sans sm:text-base text-xs font-extrabold opacity-30 uppercase'>Overview</span>
                {blog.shortDescription}
              </h2>
              {blog.categories && blog.categories.length > 0 && <span className='text-center flex items-center gap-2 font-medium uppercase py-4 opacity-60'>
                <Tags size={14} className='-scale-100 -rotate-90' /> {blog.categories.join(', ')}
              </span>}
            </div>
            <Image priority
              src={getBannerImgUrl()}
              alt={blog.title}
              width={1200} height={600}
              className='rounded-xl md:col-span-2 aspect-video object-cover object-center w-full'
            />
          </summary>
          <hr className='w-full border-dashed border-accent rounded-full max-w-6xl mx-auto border-b-8 bg-transparent border-0 mb-8' />

        </article>
      </Suspense>

      <Suspense>
        {blog.content && <div className='relative overflow-hidden whitespace-pre-wrap sm:mx-auto mx-2 max-w-6xl'>
          <pre className='html-content whitespace-pre-wrap font-sans' suppressHydrationWarning dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>}
      </Suspense>

      <hr id='comments-section' className='w-full my-16 border-dashed border-accent rounded-full max-w-6xl mx-auto border-b bg-transparent border-0' />
      {/* <Suspense fallback={<div className='mx-auto max-w-5xl'>Comment Loading...</div>}>
        <CommentSection blog={blog} />
      </Suspense> */}

      {/* RELATED BLOGS */}

      {/* <RelatedBlogSection
        className='text-center sm:max-w-6xl sm:mx-auto mx-2'
        title='Related Blogs'
        quantity={3}
      /> */}

      {/* NEWS LETTER */}

      <NewsLetter />


    </main>
  )
}



const LoadindSkeleton = () => {
  return (
    <div className="flex flex-col space-y-8 mx-4 2xl:container 2xl:mx-auto">
      <Skeleton className="min-h-[30rem] max-h-[25rem] rounded-xl" />
      <Skeleton className="h-32 rounded-xl mx-auto w-10/12" />
      <div className="space-y-2 sm:mx-16">
        <Skeleton className="min-h-[20rem] w-full" />
        <Skeleton className="h-[40rem] w-full" />
      </div>
    </div>
  )
}


const AuthorProfile = ({ blog }: { blog: Blog }) => {

  if(!blog.author) return null

  const profileImg = (): string => {
    if (isValidUrl(blog.author?.photoURL)) return blog.author.photoURL as string
    return defImg.src
  }


  return (
    <div className='relative mx-8 p-8 w-full flex justify-center items-center rounded-lg'>
      <div className='bg-accent rounded-xl p-4 sm:gap-4 gap-2 flex sm:flex-row flex-col items-center sm:justify-start justify-center w-fit'>
        <Image loading='lazy'
          src={profileImg()}
          alt={blog.author.displayName || 'author'}
          width={450} height={450}
          className='sm:h-24 sm:w-24 h-16 w-16 block object-cover object-center sm:rounded-lg rounded-full mx-auto'
        />
        <div className=' sm:space-y-3 space-y-1'>

          <div className='sm:pl-2 sm:text-left text-center'>
            <h2 className='sm:text-xl text-base capitalize m-0 font-semibold'>{blog.author.displayName}</h2>
            <h3 className='sm:text-sm text-xs font-normal capitalize m-0'>{blog.author.profession}</h3>
          </div>

          <div className='flex flex-wrap items-center gap-2'>
            <Link title='Visit My Website' href="#" className='block bg-background rounded-full p-1 hover:bg-foreground hover:text-background transition-3 '>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current sm:w-5 w-4 sm:h-5 h-4 icon icon-tabler icon-tabler-world" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                <path d="M3.6 9h16.8" />
                <path d="M3.6 15h16.8" />
                <path d="M11.5 3a17 17 0 0 0 0 18" />
                <path d="M12.5 3a17 17 0 0 1 0 18" />
              </svg>
            </Link>
            <Link title='LinkedIn' href="#" className='block bg-background rounded-full p-1 hover:bg-foreground hover:text-background transition-3 '>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current sm:w-5 w-4 sm:h-5 h-4 icon icon-tabler icon-tabler-brand-linkedin" viewBox="0 0 24 24" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                <path d="M8 11l0 5" />
                <path d="M8 8l0 .01" />
                <path d="M12 16l0 -5" />
                <path d="M16 16v-3a2 2 0 0 0 -4 0" />
              </svg>
            </Link>
            <Link title='Youtube' href="#" className='block bg-background rounded-full p-1 hover:bg-foreground hover:text-background transition-3 '>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current sm:w-5 w-4 sm:h-5 h-4 icon icon-tabler icon-tabler-brand-youtube" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8z" />
                <path d="M10 9l5 3l-5 3z" />
              </svg>
            </Link>
            <Link title='Facebook' href="#" className='block bg-background rounded-full p-1 hover:bg-foreground hover:text-background transition-3 '>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current sm:w-5 w-4 sm:h-5 h-4 icon icon-tabler icon-tabler-brand-facebook" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
              </svg>
            </Link>
            <Link title='Instagram' href="#" className='block bg-background rounded-full p-1 hover:bg-foreground hover:text-background transition-3 '>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current sm:w-5 w-4 sm:h-5 h-4 icon icon-tabler icon-tabler-brand-instagram" viewBox="0 0 24 24" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
                <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                <path d="M16.5 7.5l0 .01" />
              </svg>
            </Link>
            <Link title='Twitter' href="#" className='block bg-background rounded-full p-1 hover:bg-foreground hover:text-background transition-3 '>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current sm:w-5 w-4 sm:h-5 h-4 icon icon-tabler icon-tabler-brand-x" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
              </svg>
            </Link>
            <Link title='Threads' href="#" className='block bg-background rounded-full p-1 hover:bg-foreground hover:text-background transition-3 '>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current sm:w-5 w-4 sm:h-5 h-4 icon icon-tabler icon-tabler-brand-threads" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M19 7.5c-1.333 -3 -3.667 -4.5 -7 -4.5c-5 0 -8 2.5 -8 9s3.5 9 8 9s7 -3 7 -5s-1 -5 -7 -5c-2.5 0 -3 1.25 -3 2.5c0 1.5 1 2.5 2.5 2.5c2.5 0 3.5 -1.5 3.5 -5s-2 -4 -3 -4s-1.833 .333 -2.5 1" />
              </svg>
            </Link>

          </div>

        </div>

      </div>
    </div>
  )
}
