import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 font-arabic" dir="rtl">
      <div className="text-gold-600 font-serif text-9xl font-black mb-4 tracking-widest opacity-20">404</div>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">عذراً، هذه الصفحة غير موجودة</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">يبدو أن الرابط الذي اتبعته مكسور أو أن الصفحة قد نُقلت.</p>
      <Link href="/" className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-gold-600 dark:hover:bg-gold-500 transition-colors">العودة للرئيسية</Link>
    </div>
  );
}
