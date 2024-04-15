import { getBlogsByCategory } from '@/lib/services/blogs/actions';
import { SearchParams } from '@/type/type';
import Image from 'next/image';
import bannerImg from '@/public/images/software-developer-0.jpeg';
import BlogSection from './_components/blog-section';
import FilterByCategory from '@/components/blog/filter-by-category';
import BlogBanner from './_components/blog-banner';
import NewsLetter from '@/components/newsletter/news-letter';
import { Suspense } from 'react';
import { getCategories } from '@/lib/services/categories/actions';
import PublicLayout from './publicLayout';




export default async function page({ searchParams }: SearchParams) {

  const { category } = searchParams
  const blogs: any = await getBlogsByCategory((category || 'all'), 4)
  const navLinks = await getCategories()
  navLinks.unshift('All')

  /* const session = await getServerSession(authOptions)
  console.log(session) */

  return (
      <Suspense fallback={<div className='2xl:container mx-auto'>Loading...</div>}>
        <Image src={bannerImg} alt='hero' priority
          width={1920} height={1270}
          className='absolute min-h-[35rem] h-[50vh] w-full rounded-b-3xl -z-0 top-0 bottom-0 left-0 right-0 object-cover object-center 2xl:object-bottom' />

        <main className='relative z-[60] 2xl:container 2xl:mx-auto bg-background md:mx-10 m-2 space-y-8 rounded-3xl mt-[25rem] sm:px-8 shadow-0 p-4'>
          <BlogBanner title={<span> Welcome to <strong className='underline decoration-wavy decoration-destructive text-destructive italic pr-1'> VAKAKS</strong> Blog </span>}
          />
        </main>

        <main className='2xl:container mx-auto sm:p-16 p-4'>
          <BlogSection quantity={8} blogs={blogs}
            notFoundMessage={'No blogs found in this category!'}
            title='Latest Blogs'>
            <FilterByCategory navLinks={navLinks.slice(0, 20)} />
          </BlogSection>
        </main>

        <section className='md:mb-32 mb-16'>
          <NewsLetter />
        </section>

      </Suspense>
  );
}

