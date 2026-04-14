import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" }, include: { category: true } });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">إدارة المقالات</h1>
        <Link href="/admin/posts/new" className="bg-gold-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-gold-700 transition-colors">+ مقال جديد</Link>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
        <table className="w-full text-start">
          <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 text-sm">
            <tr>
              <th className="px-6 py-4 text-start font-medium">العنوان</th>
              <th className="px-6 py-4 text-start font-medium">القسم</th>
              <th className="px-6 py-4 text-start font-medium">الحالة</th>
              <th className="px-6 py-4 text-end font-medium">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-sm">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{post.title}</td>
                <td className="px-6 py-4 text-gray-500">{post.category?.name || "بدون قسم"}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${post.status === 'PUBLISHED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{post.status === 'PUBLISHED' ? 'منشور' : 'مسودة'}</span>
                </td>
                <td className="px-6 py-4 text-end space-x-3 rtl:space-x-reverse">
                  <Link href={`/admin/posts/${post.id}/edit`} className="text-blue-600 hover:text-blue-800 font-medium">تعديل</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
