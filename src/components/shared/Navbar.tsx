'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, User, Search, LogOut, LayoutDashboard, ChevronDown, Menu, X } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export const Navbar = () => {
  const { user, logout } = useAuthStore();
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ডাইনামিক অ্যাডমিন চেক (ডাটাবেজে ছোট বা বড় হাতের যাই থাকুক)
  const isAdmin = user?.role?.toUpperCase() === 'ADMIN';

  const categories = [
    { name: 'Computers', href: '/category/computers' },
    { name: 'Smartphones', href: '/category/smartphones' },
    { name: 'Accessories', href: '/category/accessories' },
    { name: 'Monitors', href: '/category/monitors' },
  ];

  return (
    <nav className="bg-black text-white sticky top-0 z-50 shadow-md w-full border-b border-gray-900">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* --- Left Section --- */}
        <div className="flex items-center gap-3">
          <button 
            className="lg:hidden p-1 hover:bg-gray-800 rounded"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
          
          <Link href="/" className="text-xl md:text-2xl font-black tracking-tighter">
            PRIME<span className="text-blue-500">TECH</span>
          </Link>

          {/* অ্যাডমিন প্যানেল বাটন (লোগোর পাশে ডেস্কটপ ভিউতে) */}
          {isAdmin && (
            <Link 
              href="/admin" 
              className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ml-4 border border-blue-500 shadow-lg shadow-blue-900/20"
            >
              <LayoutDashboard size={14} /> Admin Panel
            </Link>
          )}

          {/* Categories Dropdown */}
          <div 
            className="relative hidden lg:block"
            onMouseEnter={() => setIsCatOpen(true)}
            onMouseLeave={() => setIsCatOpen(false)}
          >
            <button className="flex items-center gap-1.5 text-[13px] font-black uppercase tracking-widest hover:text-blue-500 transition-colors py-5 ml-6">
              Categories <ChevronDown size={14} className={`transition-transform duration-300 ${isCatOpen ? 'rotate-180' : ''}`} />
            </button>
            {isCatOpen && (
              <div className="absolute top-[60px] left-6 w-52 bg-white text-black shadow-2xl rounded-b-xl py-3 border-t-2 border-blue-500">
                {categories.map((cat) => (
                  <Link key={cat.name} href={cat.href} className="block px-5 py-2.5 text-sm font-bold hover:bg-gray-50 hover:text-blue-600 transition-all">
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* --- Middle: Search Bar --- */}
        <div className="hidden lg:flex flex-1 mx-12 max-w-md relative">
          <input 
            type="text" 
            placeholder="Search for gadgets..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-800 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm text-gray-300"
          />
          <Search className="absolute left-3 top-2.5 text-gray-500" size={16} />
        </div>

        {/* --- Right: Cart & Auth --- */}
        <div className="flex items-center gap-3 md:gap-6">
          <button className="lg:hidden hover:text-blue-400 p-1">
            <Search size={22} />
          </button>

          <Link href="/cart" className="relative hover:text-blue-400 transition-all">
            <ShoppingCart size={22} />
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-black border-2 border-black">
              0
            </span>
          </Link>

          {user ? (
            <div className="flex items-center gap-3 border-l border-gray-800 pl-4 md:pl-6">
              <div className="hidden sm:flex flex-col items-end text-right">
                <span className={`text-[9px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded shadow-sm ${isAdmin ? 'bg-blue-600 text-white' : 'bg-gray-800 text-blue-400'}`}>
                  {user.role}
                </span>
                <span className="text-sm font-black uppercase tracking-tight mt-0.5">{user.name}</span>
              </div>
              <button onClick={logout} className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-full transition-all">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link href="/login" className="bg-white text-black px-4 py-1.5 md:px-5 md:py-2 rounded-full text-xs font-black uppercase hover:bg-blue-500 hover:text-white transition-all shadow-md">
              Login
            </Link>
          )}
        </div>
      </div>

      {/* --- Mobile Sidebar Overlay --- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] lg:hidden">
          <div className="w-72 h-full bg-white text-black p-6 animate-in slide-in-from-left duration-300 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black italic text-blue-600">PRIME MENU</h2>
              <button onClick={() => setIsMobileMenuOpen(false)}><X size={24} /></button>
            </div>

            <div className="space-y-6 flex-1">
              {isAdmin && (
                <Link 
                  href="/admin" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 bg-blue-600 text-white p-4 rounded-xl font-bold text-sm shadow-lg shadow-blue-100"
                >
                  <LayoutDashboard size={18} /> Admin Dashboard
                </Link>
              )}

              <div className="border-b pb-4">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Categories</p>
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <Link key={cat.name} href={cat.href} onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-bold hover:text-blue-600 transition-colors">
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {user && (
              <div className="pt-6 border-t flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white uppercase shadow-md">
                  {user.name[0]}
                </div>
                <div>
                  <span className={`text-[9px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded shadow-sm ${isAdmin ? 'bg-blue-600 text-white' : 'bg-gray-100 text-blue-600'}`}>
                    {user.role}
                  </span>
                  <p className="text-sm font-black uppercase tracking-tight mt-0.5 text-gray-900">{user.name}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};