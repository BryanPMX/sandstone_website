import { MetadataRoute } from 'next'
import { cache } from 'react'
import { fetchMyPropertyCards, getSortedPosts } from '@/services'
import { BLOG_AREAS } from '@/config/blog-areas'

const getCachedProperties = cache(async () => {
  return fetchMyPropertyCards()
})

const getCachedBlogPosts = cache(async () => {
  return getSortedPosts()
})

const areaPages = [
  '/areas/horizon-city-tx',
  '/areas/upper-valley',
  '/areas/west-el-paso',
  '/areas/northeast-el-paso',
  '/areas/lower-valley',
  '/areas/sandstones-new-builds',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [properties, blogPosts] = await Promise.all([
    getCachedProperties(),
    getCachedBlogPosts(),
  ])

  const baseUrl = 'https://sandstone.homes'

  const areaUrls = areaPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  const listingUrls = properties.map((property) => ({
    url: `${baseUrl}/listings/${encodeURIComponent(property.routeId)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const blogPostUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const categoryUrls = BLOG_AREAS.map((area) => ({
    url: `${baseUrl}/blog/category/${area.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.65,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/listings`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/listings/map`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/pcs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sell`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/rent`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/join`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    ...areaUrls,
    ...categoryUrls,
    ...blogPostUrls,
    ...listingUrls,
  ]
}