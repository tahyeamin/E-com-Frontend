'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Plus, ListTree } from 'lucide-react';
import { toast } from 'react-hot-toast'; // যদি toast ইন্সটল করা থাকে

interface Category {
  id: number;
  name: string;
  description?: string;
}

export default function CategoryPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  // ১. ডাটাবেজ থেকে ক্যাটাগরি লিস্ট নিয়ে আসা
  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:3000/categories'); // আপনার ব্যাকএন্ড পোর্ট
      setCategories(res.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ২. নতুন ক্যাটাগরি তৈরি করা
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token'); // টোকেন নিচ্ছি
      await axios.post(
        'http://localhost:3000/categories',
        { name, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setName('');
      setDescription('');
      fetchCategories(); // নতুন ডাটা আসার পর লিস্ট আপডেট
      alert('Category created successfully!');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Error creating category');
    } finally {
      setLoading(false);
    }
  };

  // ৩. ক্যাটাগরি ডিলিট করা
  const deleteCategory = async (id: number) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCategories(); // ডিলিট হওয়ার পর লিস্ট আপডেট
    } catch (error) {
      alert('Delete failed! Check if backend has the DELETE method.');
    }
  };

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black uppercase italic tracking-tighter text-black">Categories</h1>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">Manage your store departments</p>
        </div>
        <div className="bg-zinc-100 p-3 rounded-2xl">
          <ListTree className="text-zinc-400" size={24} />
        </div>
      </div>

      {/* Input Form Section */}
      <div className="bg-white p-8 rounded-[40px] shadow-2xl shadow-zinc-200/50 border border-zinc-100">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Category Name</label>
            <input
              type="text"
              placeholder="e.g. Electronics"
              className="w-full p-4 bg-zinc-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all font-bold text-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Description (Optional)</label>
            <input
              type="text"
              placeholder="Short brief..."
              className="w-full p-4 bg-zinc-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all font-bold text-black"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 w-full p-4 bg-black text-white rounded-2xl font-black uppercase tracking-widest hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 shadow-xl shadow-zinc-300"
          >
            {loading ? 'Processing...' : <><Plus size={18} /> Create Category</>}
          </button>
        </form>
      </div>

      {/* List Display Section */}
      <div className="bg-white rounded-[40px] shadow-2xl shadow-zinc-200/50 border border-zinc-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50 border-b border-zinc-100">
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-400">Name</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-400">Description</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50">
            {categories.length > 0 ? (
              categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-zinc-50/50 transition-colors group">
                  <td className="p-6 font-black uppercase tracking-tight text-black">{cat.name}</td>
                  <td className="p-6 text-zinc-500 text-sm font-medium">{cat.description || '—'}</td>
                  <td className="p-6 text-right">
                    <button
                      onClick={() => deleteCategory(cat.id)}
                      className="p-2 text-zinc-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="p-10 text-center text-zinc-400 font-bold italic">No categories found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}