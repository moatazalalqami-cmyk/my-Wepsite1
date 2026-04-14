import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import ArticleCard from '@/components/article/ArticleCard';

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = await prisma.category.findUnique({ where: { slug: params.slug }, include: { posts: { where: { status: 'PUBLISHED' }, orderBy: { publishedAt: 'desc' }, include: { category: true } } } });

  if (!category) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-sm font-bold text-gold-600 uppercase tracking-widest mb-3">تصفح القسم</h1>
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">{category.name}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {category.posts.map((post) => (
          <ArticleCard key={post.id} title={post.title} excerpt={post.excerpt || ''} category={category.name} image={post.featuredImage || '/images/default.jpg'} date={new Date(post.publishedAt!).toLocaleDateString('ar-EG')} slug={post.slug} />
        ))}
        {category.posts.length === 0 && <p className="col-span-full text-center text-gray-500">لا توجد مقالات في هذا القسم حالياً.</p>}
      </div>
    </div>
  );
}
