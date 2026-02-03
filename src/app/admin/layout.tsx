'use client';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LayoutDashboard, Users, Package, ShoppingBag, FolderTree } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // ১. টেম্পোরারি ফিক্স: এখন আর কাউকে হোমপেজে পাঠাবে না
    // আপনি পেজগুলো ঠিকঠাক বানানোর পর নিচের কমেন্টগুলো খুলে দিতে পারেন
    
    /* if (!user || user.role?.toLowerCase() !== 'admin') {
      router.push('/'); 
    } else {
      setIsAuthorized(true);
    } 
    */

    // সরাসরি পারমিশন সেট করে দিচ্ছি যাতে আপনি কাজ করতে পারেন
    setIsAuthorized(true); 
  }, [user, router]);

  // যদি অথরাইজড না হয় (লোডিং স্টেট)
  if (!isAuthorized) {
    return (
      <div className="h-screen flex items-center justify-center bg-white font-black uppercase tracking-tighter text-black">
        Loading Admin Panel...
      </div>
    );
  }

  // ন্যাভিগেশন আইটেমস (এখানে আমি Categories টাও যোগ করে দিয়েছি)
  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: <LayoutDashboard size={18} /> },
    { name: 'User Management', href: '/admin/users', icon: <Users size={18} /> },
    { name: 'Categories', href: '/admin/categories', icon: <FolderTree size={18} /> }, // নতুন যোগ করা হলো
    { name: 'Products', href: '/admin/products', icon: <Package size={18} /> },
    { name: 'Orders', href: '/admin/orders', icon: <ShoppingBag size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-white text-black font-sans">
      {/* Sidebar - ডার্ক থিম যাতে অ্যাডমিন ফিল আসে */}
      <aside className="w-64 bg-zinc-950 text-white p-6 fixed h-full shadow-2xl border-r border-zinc-800">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold italic">E</div>
          <h2 className="font-black text-2xl tracking-tighter italic uppercase">Admin</h2>
        </div>
        
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 p-3 text-[11px] font-bold uppercase tracking-widest rounded-xl transition-all duration-200 ${
                pathname === item.href 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40 translate-x-1' 
                  : 'text-zinc-500 hover:text-white hover:bg-zinc-900'
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        {/* নিচের দিকে ইউজারের ইনফো চাইলে দেখাতে পারেন */}
        <div className="absolute bottom-10 left-6 right-6 p-4 bg-zinc-900 rounded-2xl border border-zinc-800">
          <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">Logged in as</p>
          <p className="text-xs font-bold truncate">{user?.email || 'Admin User'}</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-8 bg-zinc-50/30">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}