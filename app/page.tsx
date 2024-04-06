import { getBlogs } from '@/lib/services/blogs/actions';
import { SearchParams } from '@/type/type';
import Image from 'next/image';
import bannerImg from '@/public/images/software-developer-0.jpeg';
import BlogSection from './_components/blog-section';
import FilterByCategory from '@/components/blog/filter-by-category';
import BlogBanner from './_components/blog-banner';



export default async function page({ searchParams }: SearchParams) {

  const { page } = searchParams
  const perPage = page ? parseInt(page) : 12
  const blogs: any = await getBlogs(perPage)
  // const totalBlogs = await numberOfBlogs()
  const navLinks = [
    "All",
    "Web Development",
    "React",
    "Next.js",
    "JavaScript",
  ]

  return (
    <>
      <Image src={bannerImg} alt='hero'
        width={1920} height={1270}
        className='absolute min-h-[35rem] h-[50vh] w-full rounded-b-3xl -z-0 top-0 bottom-0 left-0 right-0 object-cover object-center 2xl:object-bottom' />

      <main className='relative z-[60] 2xl:container 2xl:mx-auto bg-background md:mx-10 m-2 space-y-8 rounded-3xl mt-[25rem] sm:px-8 shadow-0 p-4'>
        <BlogBanner blogs={blogs}
          title={<span> Welcome to <strong className='italic  text-destructive mx-1'>VAKAKS</strong> Blog </span>}
        />
      </main>

      <main className='2xl:container mx-auto sm:p-16 p-4'>
        <BlogSection blogs={blogs} title='Latest Blogs'>
          <FilterByCategory navLinks={navLinks} />
        </BlogSection>
      </main>

    </>
  );
}

