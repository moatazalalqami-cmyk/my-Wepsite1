import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const menuItems = [
    { name: "الرئيسية", path: "/admin" },
    { name: "المقالات", path: "/admin/posts" },
    { name: "التعليقات", path: "/admin/comments" }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 font-arabic" dir="rtl">
      <aside className="w-64 bg-white dark:bg-gray-900 border-e border-gray-200 dark:border-gray-800 hidden md:flex flex-col">
        <div className="h-20 flex items-center px-6 border-b border-gray-200 dark:border-gray-800">
          <span className="text-xl font-bold text-gray-900 dark:text-white">لوحة التحكم</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link key={item.name} href={item.path} className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium">
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white">العودة للموقع ←</Link>
        </div>
      </aside>
      <main className="flex-1 flex flex-col">
        <header className="h-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-8">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">مرحباً، معتز</h2>
        </header>
        <div className="p-8 flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
