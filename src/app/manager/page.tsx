'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Package, ShoppingBag, TrendingUp, ChevronRight, PlusCircle, ClipboardList } from 'lucide-react';
import Link from 'next/link';

export default function ManagerDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0 });

  useEffect(() => {
    // ডাটাবেজ থেকে ইনভেন্টরি ও অর্ডার স্ট্যাটস আনা হচ্ছে
    api.get('/users/admin/stats').then(res => setStats(res.data)).catch(err => console.log(err));
  }, []);

  return (
    <div className="animate-in fade-in duration-500">
      {/* Header - একদম ক্লিন এবং শার্প */}
      <div className="flex items-center justify-between mb-16">
        <div>
          <h1 className="text-[40px] font-black uppercase tracking-tighter text-[#0F172A] leading-none italic">
            Dashboard Overview
          </h1>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mt-2 italic">
            Platform Analytics & Metrics
          </p>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl text-blue-600 border border-gray-100 shadow-sm flex items-center gap-3">
          <TrendingUp size={18} />
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">Live Status</span>
        </div>
      </div>
      
      {/* Stats Section - আপনার ইমেজের মতো হুবহু গ্রিড */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Total Products Card */}
        <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm flex items-center justify-between group hover:border-blue-600 transition-all duration-300">
          <div className="flex items-center gap-8">
            <div className="bg-[#2563EB] p-6 rounded-3xl text-white shadow-lg">
              <Package size={32} />
            </div>
            <div>
              <p className="text-gray-400 text-[11px] font-black uppercase tracking-[0.2em] mb-1">Total Gadgets</p>
              <h4 className="text-[12px] font-bold text-gray-300 uppercase italic">Inventory Units</h4>
            </div>
          </div>
          <h3 className="text-7xl font-black text-gray-900 tracking-tighter italic leading-none">{stats.products}</h3>
        </div>

        {/* Total Orders Card */}
        <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm flex items-center justify-between group hover:border-emerald-500 transition-all duration-300">
          <div className="flex items-center gap-8">
            <div className="bg-[#10B981] p-6 rounded-3xl text-white shadow-lg">
              <ShoppingBag size={32} />
            </div>
            <div>
              <p className="text-gray-400 text-[11px] font-black uppercase tracking-[0.2em] mb-1">Total Orders</p>
              <h4 className="text-[12px] font-bold text-gray-300 uppercase italic">Store Sales</h4>
            </div>
          </div>
          <h3 className="text-7xl font-black text-gray-900 tracking-tighter italic leading-none">{stats.orders}</h3>
        </div>
      </div>

      {/* Simple Action Center */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link href="/manager/products/new" className="bg-[#F8FAFC] p-12 rounded-[50px] flex flex-col items-center text-center group border border-transparent hover:border-blue-100 transition-all">
          <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
            <PlusCircle size={40} />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900">Add New Gear</h3>
          <p className="text-[10px] text-gray-400 font-bold max-w-[200px] mt-2 mb-6 uppercase tracking-tighter">Update stock with latest items.</p>
          <div className="text-blue-600 text-[11px] font-black uppercase tracking-widest flex items-center gap-1 group-hover:gap-3 transition-all">
            Launch Tool <ChevronRight size={14} />
          </div>
        </Link>

        <Link href="/manager/orders" className="bg-[#F8FAFC] p-12 rounded-[50px] flex flex-col items-center text-center group border border-transparent hover:border-emerald-100 transition-all">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
            <ClipboardList size={40} />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900">Review Orders</h3>
          <p className="text-[10px] text-gray-400 font-bold max-w-[200px] mt-2 mb-6 uppercase tracking-tighter">Manage customer records.</p>
          <div className="text-emerald-600 text-[11px] font-black uppercase tracking-widest flex items-center gap-1 group-hover:gap-3 transition-all">
            View Records <ChevronRight size={14} />
          </div>
        </Link>
      </div>
    </div>
  );
}