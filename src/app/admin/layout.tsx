'use client';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LayoutDashboard, Users, Package, ShoppingBag } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Check if user is logged in AND has ADMIN role
    if (!user || user.role?.toLowerCase() !== 'admin') {
      router.push('/'); // Redirect unauthorized users to home
    } else {
      setIsAuthorized(true);
    }
  }, [user, router]);

  if (!isAuthorized) {
    return <div className="h-screen flex items-center justify-center bg-white font-black uppercase tracking-tighter">Loading Admin Panel...</div>;
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: <LayoutDashboard size={18} /> },
    { name: 'User Management', href: '/admin/users', icon: <Users size={18} /> },
    { name: 'Products', href: '/manager/products', icon: <Package size={18} /> },
    { name: 'Orders', href: '/admin/orders', icon: <ShoppingBag size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-white text-black">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-6 fixed h-full shadow-2xl">
        <h2 className="font-black text-2xl mb-10 tracking-tighter italic">ADMIN</h2>
        
        <nav className="space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 p-3 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all ${
                pathname === item.href 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Content Area */}
      <main className="flex-1 ml-64 p-8 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}