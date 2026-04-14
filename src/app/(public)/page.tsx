import Hero from '@/components/home/Hero';
import ArticleCard from '@/components/article/ArticleCard';
import NewsletterBlock from '@/components/shared/NewsletterBlock';
import prisma from '@/lib/prisma';

export default async function HomePage() {
  const posts = await prisma.post.findMany({
    where: { status: 'PUBLISHED' }, orderBy: { publishedAt: 'desc' }, include: { category: true }, take: 7,
  });
  const featuredPost = posts[0];
  const recentPosts = posts.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {featuredPost && (
        <Hero title={featuredPost.title} excerpt={featuredPost.excerpt || ''} category={featuredPost.category?.name || 'عام'} image={featuredPost.featuredImage || '/images/hero-mockup.jpg'} slug={featuredPost.slug} date={new Date(featuredPost.publishedAt!).toLocaleDateString('ar-EG')} />
      )}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16">
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">أحدث المقالات</h2>
            <div className="h-px bg-gray-200 dark:bg-gray-800 flex-grow ms-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recentPosts.map((post) => (
              <ArticleCard key={post.id} title={post.title} excerpt={post.excerpt || ''} category={post.category?.name || 'عام'} image={post.featuredImage || '/images/default.jpg'} date={new Date(post.publishedAt!).toLocaleDateString('ar-EG')} slug={post.slug} />
            ))}
          </div>
        </div>
        <aside className="lg:col-span-4 space-y-10">
          <NewsletterBlock />
          <div className="p-8 border-s-4 border-gold-600 bg-gray-50 dark:bg-gray-900/50 italic text-lg text-gray-700 dark:text-gray-300">
            "الكتابة ليست مجرد صف الحروف، بل هي هندسة الروح على الورق."
          </div>
        </aside>
      </div>
    </div>
  );
}
