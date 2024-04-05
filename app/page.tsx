import { CustomPagination } from '@/components/pagination/custom-pagination';
import { getBlogs, numberOfBlogs } from '@/lib/services/blogs/actions';
import { Blog } from '@/lib/services/blogs/type';
import { cn } from '@/lib/utils';
import { SearchParams } from '@/type/type';
import Image from 'next/image';
import Link from 'next/link';



export default async function page({ searchParams }: SearchParams) {

  const { page } = searchParams
  const perPage = page ? parseInt(page) : 12
  const blogs: any = await getBlogs(perPage)
  const totalBlogs = await numberOfBlogs()

  return (
    <section className='relative z-[60] bg-background md:mx-16 m-8 space-y-8 rounded-3xl mt-[25rem] sm:px-8 shadow-0 p-4'>
      <h1 className='text-5xl font-semibold font-sans mt-8'>Latest Blogs</h1>
      <Filter2 />
      <div className='grid gap-8 grid-responsive'>
        {
          blogs && blogs.map((blog: Blog) => (
            <BlogCard2 key={blog.id} blog={blog} />
          ))
        }
      </div>
      <div className='w-full grid place-items-center mt-8 pb-10'>
        <CustomPagination limit={totalBlogs} />
      </div>

    </section>
  );
}

const BlogCard2 = ({ blog, className }: { blog: Blog, className?: string }) => {
  return (
    <div className={cn('bg-accent rounded-xl p-2 overflow-hidden', className)}>
      <Link href={`/${blog.id}`} className='block h-52 relative overflow-hidden'>
        <Image src={blog.cover} alt="Blog Cover" width={1080} height={1080} className='w-full rounded-lg h-full object-cover' />
      </Link>
      <div className='py-3 space-y-1'>
        <div className='flex gap-4 justify-between opacity-70'>
        <span className='text-xs font-semibold block'>{blog.author.displayName}</span>
          <span className='text-xs block'>{new Date(blog.publishedAt.toDate()).toDateString()}</span>
        </div>
        <div className='py-2'>
          <h1 className='leading-tight font-sans text-lg m-0 line-clamp-2'>
            <Link href={`/${blog.id}`}>
              {blog.title}
            </Link>
          </h1>
          <p className='font-sans text-sm line-clamp-2 opacity-70'>
            {blog.shortDescription}
          </p>
        </div>

      {/*   <div className='flex items-center gap-2 flex-wrap py-2  rounded-lg'>
          <Image className='w-8 h-8 object-cover rounded-full' 
              src={blog.author.photoURL || ''} alt="author" width={200} height={200} />
              <p>
                <span className='text-sm font-semibold block'>{blog.author.displayName}</span>
                <span className='text-xs opacity-60 block'>{blog.author.email}</span>
              </p>
        </div> */}

        <div className='pt-2'>
          <Link href={`/${blog.id}`} className='block w-full hover:opacity-60 transition-3 bg-background text-center rounded-md p-2 text-accent-foreground'>
            Read More
          </Link>
        </div>

      </div>
      
    </div>
  );
}



const Filter2 = () => {
  return (
    <div className='flex items-center gap-x-5 gap-y-3 flex-wrap'>
      <span className='block px-3 py-1 rounded-full cursor-pointer transition-3 bg-foreground text-background'>All articles</span>
      <span className='block px-3 py-1 rounded-full cursor-pointer transition-3 hover:bg-foreground hover:text-background bg-accent'>Web Development</span>
      <span className='block px-3 py-1 rounded-full cursor-pointer transition-3 hover:bg-foreground hover:text-background bg-accent'>React</span>
      <span className='block px-3 py-1 rounded-full cursor-pointer transition-3 hover:bg-foreground hover:text-background bg-accent'>Next.js</span>
      <span className='block px-3 py-1 rounded-full cursor-pointer transition-3 hover:bg-foreground hover:text-background bg-accent'>JavaScript</span>
    </div>
  )
}

const Filter = () => {
  return (
    <div className='flex justify-between gap-8 w-full bg-accent rounded py-2 px-4'>
      <div className='flex gap-8 items-center'>
        <div className='flex gap-4 items-center'>
          <span>Sort By:</span>
          <select name="sort" id="sort" className='bg-accent text-accent-foreground'>
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
        <div className='flex gap-4 items-center'>
          <span>Category:</span>
          <select name="category" id="category" className='bg-accent text-accent-foreground'>
            <option value="all">All</option>
            <option value="technology">Technology</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="health">Health</option>
            <option value="food">Food</option>
            <option value="travel">Travel</option>
          </select>
        </div>
      </div>
      <div className='flex gap-2 items-baseline'>
        <span className='block'>Search:</span>
        <input type="text" className='bg-accent text-accent-foreground p-0 border-none rounded-none' />
      </div>
    </div>
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
