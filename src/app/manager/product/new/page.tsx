'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import toast from 'react-hot-toast';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';

export default function NewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', stock: '', categoryId: '', image: ''
  });

  useEffect(() => {
    // ক্যাটাগরি লিস্ট ফেচ করা ড্রপডাউনের জন্য
    api.get('/categories').then(res => setCategories(res.data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post('/products', {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        categoryId: parseInt(formData.categoryId),
        images: [formData.image]
      });
      toast.success("Product launched successfully!");
      router.push('/manager/products');
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to save product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-400 font-black text-[10px] uppercase tracking-widest mb-8 hover:text-black transition-colors">
        <ArrowLeft size={14} /> Back to Inventory
      </button>

      <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-2xl shadow-gray-200/50">
        <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-10">Add New Gadget</h2>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Product Title</label>
              <input 
                required
                className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm font-bold outline-none focus:ring-2 focus:ring-black transition-all"
                placeholder="e.g. iPhone 15 Pro Max"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Category</label>
              <select 
                required
                className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm font-bold outline-none focus:ring-2 focus:ring-black appearance-none"
                onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
              >
                <option value="">Choose Category</option>
                {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Price ($)</label>
              <input 
                required type="number" step="0.01"
                className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm font-bold outline-none focus:ring-2 focus:ring-black"
                placeholder="0.00"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Stock Amount</label>
              <input 
                required type="number"
                className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm font-bold outline-none focus:ring-2 focus:ring-black"
                placeholder="0"
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Image URL</label>
            <input 
              required
              className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm font-bold outline-none focus:ring-2 focus:ring-black"
              placeholder="https://images.unsplash.com/..."
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Detailed Description</label>
            <textarea 
              rows={4}
              className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm font-bold outline-none focus:ring-2 focus:ring-black resize-none"
              placeholder="Tell about the features..."
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <button 
            disabled={isSubmitting}
            type="submit" 
            className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-gray-800 transition-all disabled:opacity-50"
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : <Save size={20} />}
            {isSubmitting ? "Uploading..." : "Publish Product"}
          </button>
        </form>
      </div>
    </div>
  );
}