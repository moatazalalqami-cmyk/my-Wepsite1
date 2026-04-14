import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://mutaz-blog.com';
  const posts = await prisma.post.findMany({ where: { status: 'PUBLISHED' }, select: { slug: true, updatedAt: true } });
  const postUrls = posts.map((post) => ({ url: `${baseUrl}/article/${post.slug}`, lastModified: post.updatedAt, changeFrequency: 'weekly' as const, priority: 0.8 }));
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/categories`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    ...postUrls,
  ];
}
