'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/axios'; 
import { ProductCard } from '@/components/product/ProductCard';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Axios দিয়ে একই সাথে সব ডাটা নামানো
        const [prodRes, catRes] = await Promise.all([
          api.get('/products'), 
          api.get('/category')
        ]);
        setProducts(prodRes.data);
        setCategories(catRes.data);
      } catch (err) {
        console.error("Axios Error:", err);
      }
    };
    fetchData();
  }, []);

  // ক্যাটাগরি অনুযায়ী ফিল্টার করা
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter((p: any) => p.categoryId === selectedCategory);

  return (
    <div className="container mx-auto py-10 bg-white">
      {/* Category Filter Buttons */}
      <div className="flex gap-4 mb-10 overflow-x-auto pb-2">
        <button 
          onClick={() => setSelectedCategory('all')}
          className={`px-6 py-2 rounded-full border transition-all ${selectedCategory === 'all' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
        >
          All
        </button>
        {categories.map((cat: any) => (
          <button 
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-6 py-2 rounded-full border transition-all ${selectedCategory === cat.id ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {filteredProducts.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}