'use client';
import { useState, useEffect } from 'react'; // useEffect যোগ করা হয়েছে
import axios from 'axios'; // axios ইমপোর্ট করতে হবে
import Link from 'next/link';
import { ShoppingCart, User, Search, LogOut, LayoutDashboard, ChevronDown, Menu, X, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

// ক্যাটাগরি ইন্টারফেস
interface Category {
  id: number;
  name: string;
}

export const Navbar = () => {
  const { user, logout } = useAuthStore();
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // ১. ডাইনামিক ক্যাটাগরি স্টেট
  const [categories, setCategories] = useState<Category[]>([]);

  // ২. ডাটাবেজ থেকে ক্যাটাগরি নিয়ে আসা
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:3000/categories'); // আপনার ব্যাকএন্ড পোর্ট
        setCategories(res.data);
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    };
    fetchCategories();
  }, []);

  const isAdmin = user?.role?.toUpperCase() === 'ADMIN';
  const isManager = user?.role?.toUpperCase() === 'MANAGER';

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

          {isAdmin && (
            <Link 
              href="/admin" 
              className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ml-4 border border-blue-500 shadow-lg shadow-blue-900/20"
            >
              <LayoutDashboard size={14} /> Admin Panel
            </Link>
          )}

          {isManager && (
            <Link 
              href="/manager" 
              className="hidden md:flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ml-4 border border-green-500 shadow-lg shadow-green-900/20"
            >
              <ShieldCheck size={14} /> Manager Panel
            </Link>
          )}

          {/* Categories Dropdown (এখন ডাইনামিক) */}
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
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <Link 
                      key={cat.id} 
                      href={`/category/${cat.name.toLowerCase().replace(/\s+/g, '-')}`} // স্লাগ ফরম্যাট
                      className="block px-5 py-2.5 text-sm font-bold hover:bg-gray-50 hover:text-blue-600 transition-all"
                    >
                      {cat.name}
                    </Link>
                  ))
                ) : (
                  <p className="px-5 py-2.5 text-xs text-gray-400 italic">No categories found</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* --- বাকি অংশ (Search, Cart, Auth) আগের মতোই থাকবে --- */}
        {/* ... (Search bar and Right section) */}

      </div>
      {/* --- Mobile Sidebar Overlay (এখানেও একই ম্যাপ লজিক ব্যবহার করুন) --- */}
    </nav>
  );
};