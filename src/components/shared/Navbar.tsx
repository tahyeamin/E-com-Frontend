'use client';
import Link from 'next/link';
import { ShoppingCart, User, Search, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export const Navbar = () => {
  const { user, logout } = useAuthStore();

  // Role check logic (Case insensitive)
  const isAdmin = user?.role?.toLowerCase() === 'admin';

  return (
    <nav className="bg-black text-white sticky top-0 z-50 shadow-md w-full">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Left: Logo & Conditional Admin Button */}
        <div className="flex items-center gap-4">
          <Link href="/" className="text-2xl font-black tracking-tighter mr-4">
            PRIME<span className="text-blue-500">TECH</span>
          </Link>

          {/* Only Admins will see this button now */}
          {isAdmin && (
            <Link 
              href="/admin" 
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all border border-blue-500 shadow-lg shadow-blue-900/20"
            >
              <LayoutDashboard size={14} />
              Admin Panel
            </Link>
          )}
        </div>

        {/* Middle: Search Bar */}
        <div className="hidden md:flex flex-1 mx-8 max-sm relative">
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full pl-10 pr-4 py-1.5 bg-gray-900 border border-gray-800 rounded-md focus:ring-1 focus:ring-blue-500 outline-none text-sm text-gray-300"
          />
          <Search className="absolute left-3 top-2 text-gray-500" size={16} />
        </div>

        {/* Right: Cart & Auth */}
        <div className="flex items-center gap-5">
          <Link href="/cart" className="relative hover:text-blue-400">
            <ShoppingCart size={22} />
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
          </Link>

          {user ? (
            <div className="flex items-center gap-4 border-l border-gray-800 pl-4">
              <span className="text-sm font-medium">{user.name}</span>
              <button onClick={logout} className="hover:text-red-500"><LogOut size={20} /></button>
            </div>
          ) : (
            <Link href="/login" className="hover:text-blue-400"><User size={22} /></Link>
          )}
        </div>
      </div>
    </nav>
  );
};