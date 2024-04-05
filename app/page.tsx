import { CustomPagination } from '@/components/pagination/custom-pagination';
import { getBlogs } from '@/lib/services/blogs/actions';
import { Blog } from '@/lib/services/blogs/type';
import { cn } from '@/lib/utils';
import { SearchParams } from '@/type/type';
import Image from 'next/image';
import Link from 'next/link';


export default async function page({ searchParams }: SearchParams) {

  const { page } = searchParams
  const perPage = page ? parseInt(page) : 13
  const blogs: any = await getBlogs(perPage)

  return (
    <main className='2xl:container bg-background/70 mx-auto sm:p-8 p-4 space-y-8'>

      {
        blogs.length === 0 && <div className='min-h-[50vh] grid place-items-center'>
          <h2 className='text-xl font-mono italic font-thin opacity-40 text-center'>No Blogs Found...</h2>
        </div>
      }

      <div className={cn('grid grid-responsive gap-8 ', (blogs.length > 13 ? "min-h-[70vh]" : ''))}>
        {
          blogs.map((blog: Blog, index: number) => (
            <BlogCard key={blog.id} blog={blog} className={index % 3 === 0 ? "shadow-0" : " row-span-2 "} />
          ))
        }
      </div>

      {blogs.length > 13 && <CustomPagination />}
    </main>
  );
}

const BlogCard = ({ blog, className }: { blog: Blog, className?: string }) => {
  return (
    <div className={cn('bg-accent flex justify-center flex-col text-accent-foreground rounded-md border p-8 space-y-4', className)}>
      <h1 className='text-lg'>
        <Link href={`/${blog.id}`}>
          {blog.title}
        </Link>
      </h1>
      <div className='flex items-center bg-popover p-2 rounded flex-wrap gap-4 text-destructive opacity-80'>
        <span className='text-xs block'>{blog.categoryIds.join(' | ')}</span>
        <span className='text-xs block'>{new Date(blog.publishedAt.toDate()).toDateString()}</span>
      </div>

      <Link href={`/${blog.id}`}>
        <span
          dangerouslySetInnerHTML={{ __html: blog.shortDescription }}
          className='text-card-foreground overflow-hidden font-sans opacity-60 line-clamp-4'
        />
      </Link>

      <div className='flex items-center gap-2'>
        <Image className='w-10 h-10 object-cover rounded-full'
          src={blog.author.photoURL || ''} alt={blog.title} width={200} height={300} />
        <div className='grid'>
          <span className='block font-semibold text-sm'>{blog.author.displayName}</span>
          <span className='block opacity-50 text-xs'>{blog.author.email}</span>
        </div>
      </div>
    </div>
  );
}
