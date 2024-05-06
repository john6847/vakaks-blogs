import { Blog } from '@/lib/services/blogs/type'
import vakaks from '@/app/favicon.ico'

export const isValidUrl = (url: string | null | undefined) => {
  if (!url) return false
  try {
    new URL(url)
    return true
  } catch (error) {
    return false
  }
}

export const formatNumberToNk = (num: number) => {
  if (num < 1000) return num
  if (num < 1000000) return (num / 1000).toFixed(1) + 'k'
  return (num / 1000000).toFixed(1) + 'm'
}

export const textCapitalize = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export const textCamelCase = (text: string) => {
  return text.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase()
  }).replace(/\s+/g, ' ')
}


const getDate = (blogDate:any) => {

  if (blogDate) return new Date().toDateString()
  const date = new Date(blogDate.seconds * 1000)
  return date.toDateString()
}

export const generateBlogPostingJsonLd = (blog: Blog) => {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://blogs.vakaks.com/articles/" + blog.id
    },
    "headline": blog.title,
    "datePublished": getDate(blog.publishedAt),
    "dateModified": getDate(blog.updatedAt),
    "description": blog.shortDescription,
    "image": [blog.cover],
    "author": {
      "@type": "Person",
      "name": blog.author?.displayName || 'Vakaks',
      "image": blog.author?.photoURL,
      "jobTitle": blog.author?.profession,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Vakaks",
      "logo": {
        "@type": "ImageObject",
        "url": vakaks,
        "width": 800,
        "height": 800
      }
    }
  }
}
