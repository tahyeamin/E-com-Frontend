'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Edit, Trash2, Plus, Package } from 'lucide-react';
import Link from 'next/link';

export default function ManagerProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure? This gear will be deleted forever.")) {
      try {
        await api.delete(`/products/${Number(id)}`);
        alert("Product deleted!");
        fetchProducts();
      } catch (err: any) {
        alert("Delete failed! Check database constraints.");
      }
    }
  };

  return (
    <div className="animate-in fade-in duration-700">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-[40px] font-black uppercase tracking-tighter text-[#0F172A] leading-none italic">
            Inventory <span className="text-blue-600">Trace</span>
          </h1>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mt-2 italic">Real-time stock control</p>
        </div>
        <Link
          href="/manager/products/new"
          className="bg-blue-600 text-white px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-black hover:scale-105 transition-all shadow-[0_10px_20px_rgba(37,99,235,0.3)] border-2 border-white/10 relative z-10"
        >
          <Plus size={18} className="text-white" />
          Add New Gear
        </Link>
      </div>

      <div className="bg-white rounded-[35px] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Product</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Price</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Inventory Status</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map((product: any) => (
              <tr key={product.id} className="hover:bg-gray-50/30 transition-colors group">
                <td className="px-8 py-6 flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center border border-gray-100">
                    {product.image && product.image.length > 0 ? (
                      <img
                        src={`http://localhost:3000${product.image[0]}`}
                        className="w-full h-full object-cover"
                        alt={product.name}
                        onError={(e) => {
                          // ইমেজ না পাওয়া গেলে আইকন দেখাবে
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (<Package size={20} className="text-gray-300" />)}
                  </div>
                  <p className="text-sm font-black uppercase text-gray-900 tracking-tight">{product.name}</p>
                </td>

                <td className="px-8 py-6 font-black italic text-gray-900 text-lg">
                  ${product.price}
                </td>

                <td className="px-8 py-6">
                  <div className="flex flex-col gap-1">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest w-fit ${product.stock > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                      }`}>
                      {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                    <p className="text-[11px] font-bold text-gray-400 ml-2">
                      {product.stock} Units
                    </p>
                  </div>
                </td>

                <td className="px-8 py-6">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/manager/products/edit/${product.id}`} className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <Edit size={18} />
                    </Link>
                    <button onClick={() => handleDelete(product.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}