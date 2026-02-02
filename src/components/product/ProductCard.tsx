'use client';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export const ProductCard = ({ product }: { product: any }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 transition-all hover:border-gray-300 group">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-square bg-gray-50 rounded-lg mb-4 overflow-hidden relative">
          <img 
            src={`http://localhost:3000/${product.image}`} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
          />
        </div>
      </Link>
      
      <h3 className="font-bold text-gray-900 text-lg mb-1">{product.name}</h3>
      <p className="text-gray-500 text-sm mb-4 line-clamp-1">{product.description}</p>
      
      <div className="flex items-center justify-between">
        <span className="text-xl font-black">${product.price}</span>
        <Button variant="outline" className="rounded-full h-10 w-10 p-0 border-black text-black hover:bg-black hover:text-white">
          <ShoppingCart size={18} />
        </Button>
      </div>
    </div>
  );
};