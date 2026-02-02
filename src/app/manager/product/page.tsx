'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import Link from 'next/link';
import { Package, Plus, Loader2, Edit3, Search } from 'lucide-react';

export default function ManagerProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-green-600" size={40} /></div>;

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-gray-900 italic">Inventory</h1>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Manage gadget stock and pricing</p>
        </div>
        <Link href="/manager/products/new" className="bg-black text-white px-8 py-4 rounded-2xl font-black text-xs uppercase flex items-center gap-2 hover:bg-gray-800 transition-all shadow-xl shadow-gray-200">
          <Plus size={18} /> Add New Gadget
        </Link>
      </div>

      <div className="bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Product Details</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Stock Level</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Unit Price</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map((p: any) => (
              <tr key={p.id} className="hover:bg-green-50/20 transition-colors group">
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <img src={p.images?.[0] || 'https://via.placeholder.com/150'} className="w-12 h-12 rounded-xl object-cover bg-gray-100" alt={p.name} />
                    <div>
                      <p className="text-sm font-black uppercase tracking-tight text-gray-900">{p.name}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">{p.category?.name || 'General'}</p>
                    </div>
                  </div>
                </td>
                <td className="p-6">
                  <span className={`text-xs font-black ${p.stock < 5 ? 'text-red-500' : 'text-gray-600'}`}>
                    {p.stock} Units {p.stock < 5 && '(Low)'}
                  </span>
                </td>
                <td className="p-6 text-sm font-black text-green-600">${p.price}</td>
                <td className="p-6 text-right">
                  <button className="p-2 text-gray-300 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all">
                    <Edit3 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}