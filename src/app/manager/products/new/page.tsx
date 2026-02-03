'use client';
import { useState } from 'react';
import api from '@/lib/axios';
import { Upload, X, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AddProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({ name: '', price: '', stock: '', categoryId: '', description: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('stock', formData.stock);
    data.append('categoryId', formData.categoryId); // এটি অবশ্যই ডাটাবেজে থাকতে হবে
    data.append('description', formData.description);
    if (file) data.append('image', file);

    try {
      await api.post('/products', data);
      router.push('/manager/products');
    } catch (err) {
      alert("Error: Category ID is required and must exist!");
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Link href="/manager/products" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-8"><ChevronLeft size={16} /> Back</Link>
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl font-black uppercase italic mb-8 text-gray-900">Add <span className="text-blue-600">Gear</span></h1>
          <input required placeholder="Gear Name" className="w-full p-5 bg-gray-50 rounded-2xl border" onChange={e => setFormData({...formData, name: e.target.value})} />
          <div className="grid grid-cols-2 gap-4">
            <input required type="number" placeholder="Price" className="w-full p-5 bg-gray-50 rounded-2xl border" onChange={e => setFormData({...formData, price: e.target.value})} />
            <input required type="number" placeholder="Stock" className="w-full p-5 bg-gray-50 rounded-2xl border" onChange={e => setFormData({...formData, stock: e.target.value})} />
          </div>
          <input required type="number" placeholder="Category ID (Must Exist)" className="w-full p-5 bg-gray-50 rounded-2xl border" onChange={e => setFormData({...formData, categoryId: e.target.value})} />
          <textarea placeholder="Description" rows={4} className="w-full p-5 bg-gray-50 rounded-2xl border" onChange={e => setFormData({...formData, description: e.target.value})} />
          <button disabled={loading} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-black transition-all">
            {loading ? "Publishing..." : "Publish Product"}
          </button>
        </div>
        <div className="w-full lg:w-[350px]">
           <label className="h-[400px] border-2 border-dashed rounded-[40px] flex flex-col items-center justify-center cursor-pointer bg-gray-50 overflow-hidden relative">
              {preview ? <img src={preview} className="w-full h-full object-cover" /> : <Upload size={30} className="text-gray-300" />}
              <input type="file" className="hidden" accept="image/*" onChange={e => {
                const s = e.target.files?.[0];
                if(s) { setFile(s); setPreview(URL.createObjectURL(s)); }
              }} />
           </label>
        </div>
      </form>
    </div>
  );
}