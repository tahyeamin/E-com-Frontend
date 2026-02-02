'use client';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LayoutDashboard, Package, ShoppingBag, LogOut, Users } from 'lucide-react';

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const role = user?.role?.toUpperCase();
    if (user && (role === 'ADMIN' || role === 'MANAGER')) {
      setIsAuthorized(true);
    } else if (user) {
      router.push('/');
    }
  }, [user, router]);

  if (!isAuthorized) return null;

  const navItems = [
    { name: 'Dashboard', href: '/manager', icon: <LayoutDashboard size={18} /> },
    { name: 'User Management', href: '/manager/users', icon: <Users size={18} /> },
    { name: 'Products', href: '/manager/products', icon: <Package size={18} /> },
    { name: 'Orders', href: '/manager/orders', icon: <ShoppingBag size={18} /> },
  ];

  return (
    <div className="flex bg-[#F8F9FA] min-h-screen">
      {/* Sidebar: বাটনগুলো এখন সচল */}
      <aside className="w-[280px] sticky top-0 h-screen bg-black text-white flex flex-col pt-10 pb-6 px-4 shrink-0 overflow-y-auto z-50">
        <div className="px-6 mb-10 pt-[150px]">
          <h2 className="text-xl font-black tracking-tighter italic text-white uppercase leading-none">Manager</h2>
         
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-4 px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 ${
                  isActive ? 'bg-[#2563EB] text-white shadow-xl shadow-blue-900/20' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.icon} {item.name}
              </Link>
            );
          })}
        </nav>

        <button onClick={() => { logout(); router.push('/login'); }} 
          className="mt-auto mb-4 flex items-center gap-4 px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500/10 transition-all">
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main Content Area: স্পেসিং এবং এলাইনমেন্ট ফিক্স করা হয়েছে */}
      <main className="flex-1 p-8 overflow-hidden">
        <div className="bg-white rounded-[40px] shadow-sm min-h-full border border-gray-100 p-10">
          {children}
        </div>
      </main>
    </div>
  );
}