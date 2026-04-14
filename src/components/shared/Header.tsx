
'use client';
import { useState } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { usePathname } from 'next/navigation';
export default function Header() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const pathname = usePathname();
	const navLinks = [{ name: 'الرئيسية', path: '/' }, { name: 'الأقسام', path: '/categories' }, { name: 'من أنا', path: '/about' }, { name: 'تواصل معي', path: '/contact' }];
	return (
	<header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-lg border-b border-gray-100 dark:border-gray-800 transition-colors">
	<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
	<Link href="/" className="flex items-center gap-3 group z-50">
	<div className="flex flex-col items-center justify-center bg-gray-900 dark:bg-white text-white dark:text-gray-900 w-10 h-10 rounded-sm group-hover:bg-gold-600 transition-all"><span className="font-serif text-lg font-black mt-1">MA</span></div>
	<span className="text-xl md:text-2xl font-bold font-arabic text-gray-900 dark:text-white">معتز العلقمي</span>
	</Link>
	<div className="hidden md:flex items-center gap-8">
	<nav className="flex items-center gap-6">{navLinks.map((link) => (<Link key={link.name} href={link.path} className={`font-semibold text-sm ${pathname === link.path ? 'text-gold-600' : 'text-gray-700 dark:text-gray-300 hover:text-gold-600'}`}>{link.name}</Link>))}</nav>
	<div className="h-6 w-px bg-gray-200 dark:bg-gray-700"></div><ThemeToggle />
	<Link href="/search" className="text-gray-600 dark:text-gray-400 hover:text-gold-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></Link>
	</div>
	<div className="flex md:hidden items-center gap-4 z-50"><ThemeToggle /><button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-900 dark:text-white p-2"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">{isMobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}</svg></button></div>
	</div>
	<div className={`md:hidden absolute top-20 left-0 w-full bg-white dark:bg-[#0a0a0a] border-b border-gray-100 dark:border-gray-800 shadow-xl transition-all origin-top ${isMobileMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
	<nav className="flex flex-col px-4 py-6 space-y-4">{navLinks.map((link) => (<Link key={link.name} href={link.path} onClick={() => setIsMobileMenuOpen(false)} className={`block text-lg font-bold py-2 border-b border-gray-50 dark:border-gray-800/50 ${pathname === link.path ? 'text-gold-600' : 'text-gray-900 dark:text-gray-200'}`}>{link.name}</Link>))}</nav>
	</div>
	</header>
	);
