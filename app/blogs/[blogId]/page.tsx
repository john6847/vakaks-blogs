import { Skeleton } from '@/components/ui/skeleton'
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
import { SocialMediaIcon } from '@/components/ui/icons/social-media-icon'

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
          <summary className='transition-3 relative bg-accent sm:p-8 p-4 max-w-7xl mx-auto grid md:grid-cols-5 place-items-center md:gap-8 gap-4 transition-3 rounded-lg list-none'>

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
          <hr className='w-full border-dashed border-accent rounded-full max-w-7xl mx-auto border-b-8 bg-transparent border-0 mb-8' />

        </article>
      </Suspense>

      <Suspense>
        {blog.content && <div className='relative overflow-hidden whitespace-pre-wrap sm:mx-auto mx-2 max-w-7xl'>
          <pre className='html-content whitespace-pre-wrap font-sans' suppressHydrationWarning dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>}
      </Suspense>

      <hr id='comments-section' className='w-full my-16 border-dashed border-accent rounded-full max-w-7xl mx-auto border-b bg-transparent border-0' />
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
            {
              blog.author.links?.map((link, index) => <SocialMediaIcon key={index} name={link.name} url={link.url} />)
            }
          </div>
        </div>

      </div>
    </div>
  )
}
