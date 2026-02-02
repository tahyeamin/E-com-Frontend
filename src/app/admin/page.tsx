'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Package, ShoppingBag, Users, DollarSign } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, users: 0, revenue: 0 });

  useEffect(() => {
    // এখানে তোমার ব্যাকএন্ড থেকে স্ট্যাটাস আনার এপিআই কল হবে
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/admin/stats');
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats");
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-black mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Products" value={stats.products} icon={<Package />} color="bg-blue-500" />
        <StatCard title="Total Orders" value={stats.orders} icon={<ShoppingBag />} color="bg-green-500" />
        <StatCard title="Users" value={stats.users} icon={<Users />} color="bg-purple-500" />
        <StatCard title="Revenue" value={`$${stats.revenue}`} icon={<DollarSign />} color="bg-orange-500" />
      </div>
    </div>
  );
}

const StatCard = ({ title, value, icon, color }: any) => (
  <div className="p-6 rounded-2xl border border-gray-100 shadow-sm bg-white flex items-center gap-4">
    <div className={`${color} p-3 rounded-xl text-white`}>{icon}</div>
    <div>
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  </div>
);