'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { Save, ChevronLeft, Loader2, Upload, X } from 'lucide-react';
import Link from 'next/link';

export default function EditProduct() {
  const { id } = useParams();
  const router = useRouter();
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  
  // ইমেজ হ্যান্ডেল করার জন্য স্টেট
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({ 
    name: '', 
    price: '', 
    stock: '', 
    categoryId: '', 
    description: '' 
  });

  useEffect(() => {
    api.get(`/products/${Number(id)}`).then(res => {
      const p = res.data;
      setFormData({
        name: p.name,
        price: p.price.toString(),
        stock: p.stock.toString(),
        description: p.description || '',
        categoryId: p.categoryId.toString()
      });
      // যদি ডাটাবেজে পুরনো ছবি থাকে
      if (p.image && p.image.length > 0) {
        setPreview(`http://localhost:5000${p.image[0]}`);
      }
      setFetching(false);
    }).catch(() => {
      alert("Product not found in database!");
      router.push('/manager/products');
    });
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('price', formData.price);
      data.append('stock', formData.stock);
      data.append('categoryId', formData.categoryId);
      data.append('description', formData.description);

      // যদি নতুন ফাইল সিলেক্ট করা হয়
      if (file) {
        data.append('image', file); 
      }

      // ব্যাকএন্ডের PATCH মেথড কল করা হচ্ছে
      await api.patch(`/products/${Number(id)}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      alert("Updated successfully!");
      router.push('/manager/products');
    } catch (err) {
      alert("Update failed! Ensure valid Category ID.");
    } finally { setLoading(false); }
  };

  if (fetching) return <div className="p-20 text-center font-black italic">Scanning Gear...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-[40px] border shadow-sm">
      <Link href="/manager/products" className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 mb-8">
        <ChevronLeft size={16} /> Cancel
      </Link>
      
      <h1 className="text-3xl font-black uppercase italic mb-10">Update <span className="text-blue-600">Gear</span></h1>
      
      <form onSubmit={handleUpdate} className="space-y-6">
        <input required value={formData.name} className="w-full p-5 bg-gray-50 rounded-2xl border font-bold outline-none focus:border-blue-500" onChange={e => setFormData({...formData, name: e.target.value})} />
        
        <div className="grid grid-cols-2 gap-4">
          <input required type="number" value={formData.price} className="w-full p-5 bg-gray-50 rounded-2xl border font-bold outline-none focus:border-blue-500" onChange={e => setFormData({...formData, price: e.target.value})} />
          <input required type="number" value={formData.stock} className="w-full p-5 bg-gray-50 rounded-2xl border font-bold outline-none focus:border-blue-500" onChange={e => setFormData({...formData, stock: e.target.value})} />
        </div>
        
        <input required type="number" value={formData.categoryId} className="w-full p-5 bg-gray-50 rounded-2xl border font-bold outline-none focus:border-blue-500" onChange={e => setFormData({...formData, categoryId: e.target.value})} />
        
        <textarea value={formData.description} rows={5} className="w-full p-5 bg-gray-50 rounded-2xl border font-bold outline-none focus:border-blue-500" onChange={e => setFormData({...formData, description: e.target.value})} />

        {/* --- Image Field Added Below --- */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Product Shot</label>
          <div className={`h-40 rounded-2xl border-2 border-dashed flex items-center justify-center relative overflow-hidden transition-all ${preview ? 'border-blue-500 bg-white' : 'border-gray-200 bg-gray-50'}`}>
            {preview ? (
              <>
                <img src={preview} className="h-full w-auto object-contain" alt="Preview" />
                <button type="button" onClick={() => {setFile(null); setPreview(null);}} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow-lg">
                  <X size={14} />
                </button>
              </>
            ) : (
              <label className="flex flex-col items-center cursor-pointer">
                <Upload size={24} className="text-gray-300 mb-2" />
                <span className="text-[10px] font-black uppercase text-gray-400">Update Photo</span>
                <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                  const s = e.target.files?.[0];
                  if(s) { setFile(s); setPreview(URL.createObjectURL(s)); }
                }} />
              </label>
            )}
          </div>
        </div>
        {/* --- End of Image Field --- */}

        <button disabled={loading} className="w-full bg-black text-white py-6 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl flex items-center justify-center gap-3">
          {loading && <Loader2 className="animate-spin" size={20} />}
          {loading ? "Syncing..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}