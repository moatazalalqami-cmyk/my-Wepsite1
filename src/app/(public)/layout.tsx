import Header from '@/components/shared/Header';
import CategoryStrip from '@/components/shared/CategoryStrip';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <CategoryStrip />
      <main className="min-h-screen">
        {children}
      </main>
      <footer className="bg-gray-900 text-white py-12 border-t-4 border-gold-600 mt-20 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-gray-400 font-bold mb-4 font-serif text-3xl tracking-widest text-gold-600">MA</p>
          <p className="text-gray-400 mb-6">مدونة معتز العلقمي © {new Date().getFullYear()}. جميع الحقوق محفوظة.</p>
          <div className="flex justify-center gap-6">
            <a href="/privacy" className="hover:text-gold-500 transition-colors">سياسة الخصوصية</a>
            <a href="/terms" className="hover:text-gold-500 transition-colors">الشروط والأحكام</a>
          </div>
        </div>
      </footer>
    </>
  );
}
