import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import ShareButtons from '@/components/article/ShareButtons';
import CommentsSection from '@/components/article/CommentsSection';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await prisma.post.findUnique({ where: { slug: params.slug } });
  if (!post) return {};
  const url = `https://mutaz-blog.com/article/${post.slug}`;
  return {
    title: post.seoTitle || post.title,
    description: post.seoDesc || post.excerpt,
    alternates: { canonical: url },
    openGraph: { title: post.seoTitle || post.title, description: post.seoDesc || post.excerpt || '', url, type: 'article', publishedTime: post.publishedAt?.toISOString(), images: [{ url: post.featuredImage || '/default-og.jpg', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: post.seoTitle || post.title, description: post.seoDesc || post.excerpt || '', images: [post.featuredImage || '/default-og.jpg'] },
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const post = await prisma.post.findUnique({ where: { slug: params.slug }, include: { author: true, category: true, tags: true, comments: { where: { isApproved: true } } } });
  if (!post || post.status !== 'PUBLISHED') notFound();

  const jsonLd = { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: post.title, image: post.featuredImage, datePublished: post.publishedAt?.toISOString(), dateModified: post.updatedAt?.toISOString(), author: { '@type': 'Person', name: post.author.name } };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="mb-10 text-center">
        {post.category && (<Link href={`/category/${post.category.slug}`} className="text-sm font-semibold tracking-wider text-gold-600 uppercase mb-4 inline-block hover:text-gold-700">{post.category.name}</Link>)}
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-gray-900 dark:text-white">{post.title}</h1>
        <div className="flex items-center justify-center gap-4 text-gray-500 text-sm font-medium">
          <span>{post.author.name}</span><span>•</span><time dateTime={post.publishedAt?.toISOString()}>{new Date(post.publishedAt!).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
        </div>
      </header>
      {post.featuredImage && (
        <div className="relative w-full h-[400px] md:h-[600px] rounded-2xl overflow-hidden mb-12 shadow-lg">
          <Image src={post.featuredImage} alt={post.title} fill className="object-cover" priority />
        </div>
      )}
      <div className="prose prose-lg md:prose-xl dark:prose-invert max-w-none font-arabic prose-headings:font-bold prose-a:text-gold-600 hover:prose-a:text-gold-700 leading-loose" dangerouslySetInnerHTML={{ __html: post.content }} />
      <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (<Link key={tag.slug} href={`/tag/${tag.slug}`} className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 px-4 py-1.5 rounded-full text-sm hover:bg-gold-600 hover:text-white transition-colors">#{tag.name}</Link>))}
        </div>
        <ShareButtons title={post.title} text={post.excerpt || ''} />
      </div>
      <CommentsSection postId={post.id} comments={post.comments} />
    </article>
  );
}
