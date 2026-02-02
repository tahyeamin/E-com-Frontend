'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/axios';
import { Package, ShoppingBag, Users, DollarSign, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, users: 0, revenue: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/users/admin/stats');
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats");
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="animate-in fade-in duration-700">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-gray-900">Dashboard Overview</h1>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">Platform Analytics & Metrics</p>
        </div>
        <div className="hidden md:flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl text-blue-600 border border-blue-100">
          <TrendingUp size={16} />
          <span className="text-[11px] font-black uppercase tracking-wider">Live System Status</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Products Card */}
        <Link href="/admin/products" className="block group">
          <StatCard title="Total Products" value={stats.products} icon={<Package size={24} />} color="bg-blue-600" />
        </Link>

        {/* Orders Card */}
        <Link href="/admin/orders" className="block group">
          <StatCard title="Total Orders" value={stats.orders} icon={<ShoppingBag size={24} />} color="bg-emerald-600" />
        </Link>
        
        {/* Users Card */}
        <Link href="/admin/users" className="block group">
          <StatCard title="Total Users" value={stats.users} icon={<Users size={24} />} color="bg-violet-600" clickable />
        </Link>

        {/* Revenue Card */}
        <StatCard title="Net Revenue" value={`$${stats.revenue}`} icon={<DollarSign size={24} />} color="bg-orange-600" />
      </div>
    </div>
  );
}

const StatCard = ({ title, value, icon, color, clickable }: any) => (
  <div className={`p-6 rounded-[35px] border border-gray-100 shadow-sm bg-white flex items-center gap-5 transition-all duration-300 ${clickable ? 'hover:border-blue-500 hover:shadow-xl hover:-translate-y-1 cursor-pointer' : ''}`}>
    <div className={`${color} p-4 rounded-2xl text-white shadow-lg`}>
      {icon}
    </div>
    <div>
      <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">{title}</p>
      <h3 className="text-2xl font-black text-gray-900 tracking-tight">{value}</h3>
    </div>
  </div>
);