import ArticleCard from '@/components/article/ArticleCard';
import prisma from '@/lib/prisma';

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || '';
  const posts = query ? await prisma.post.findMany({ where: { status: 'PUBLISHED', OR: [{ title: { contains: query, mode: 'insensitive' } }, { content: { contains: query, mode: 'insensitive' } }, { category: { name: { contains: query, mode: 'insensitive' } } }] }, include: { category: true }, orderBy: { publishedAt: 'desc' } }) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[70vh]">
      <div className="max-w-3xl mx-auto mb-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">البحث في المدونة</h1>
        <form action="/search" method="GET" className="relative flex items-center">
          <input type="text" name="q" defaultValue={query} placeholder="ابحث عن مقال، كاتب، أو موضوع..." className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white px-6 py-4 rounded-full focus:ring-2 focus:ring-gold-500 outline-none text-lg shadow-sm" />
          <button type="submit" className="absolute left-2 bg-gold-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-gold-700 transition-colors">بحث</button>
        </form>
      </div>
      {query && <div className="mb-8 border-b border-gray-100 dark:border-gray-800 pb-4"><h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">نتائج البحث عن: <span className="text-gold-600">"{query}"</span> ({posts.length} نتيجة)</h2></div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <ArticleCard key={post.id} title={post.title} excerpt={post.excerpt || ''} category={post.category?.name || 'عام'} image={post.featuredImage || '/images/default.jpg'} date={new Date(post.publishedAt!).toLocaleDateString('ar-EG')} slug={post.slug} />
        ))}
        {posts.length === 0 && query && <p className="col-span-full text-center text-gray-500">لم يتم العثور على نتائج للبحث عن "{query}".</p>}
        {!query && <p className="col-span-full text-center text-gray-500">الرجاء إدخال كلمة للبحث.</p>}
      </div>
    </div>
  );
}
