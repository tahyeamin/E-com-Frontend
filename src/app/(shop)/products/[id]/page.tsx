'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/axios';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ShoppingCart, ArrowLeft, ShieldCheck, Truck } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error('Failed to fetch product', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading product details...</div>;
  if (!product) return <div className="text-center py-20">Product not found!</div>;

  return (
    <div className="container mx-auto px-4 py-10 bg-white">
      <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-black mb-8 transition-colors">
        <ArrowLeft size={20} /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
          <img 
            src={`http://localhost:3000/${product.image}`} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <Badge color="blue" className="w-fit mb-4">{product.category?.name || 'Electronics'}</Badge>
          <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">{product.name}</h1>
          <p className="text-3xl font-bold text-blue-600 mb-6">${product.price}</p>
          
          <p className="text-gray-600 leading-relaxed mb-8 border-b pb-8">
            {product.description}
          </p>

          <div className="flex items-center gap-4 mb-10">
            <Button size="lg" className="flex-1 py-6 text-lg rounded-2xl shadow-xl shadow-blue-100" icon={ShoppingCart}>
              Add to Cart
            </Button>
            <Badge color={product.stock > 0 ? 'green' : 'red'} className="py-2 px-4">
              {product.stock > 0 ? `${product.stock} In Stock` : 'Out of Stock'}
            </Badge>
          </div>

          {/* Key Features / Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <Truck className="text-blue-600" />
              <div className="text-xs">
                <p className="font-bold">Fast Delivery</p>
                <p className="text-gray-500">2-3 Business Days</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <ShieldCheck className="text-blue-600" />
              <div className="text-xs">
                <p className="font-bold">1 Year Warranty</p>
                <p className="text-gray-500">Official Brand Warranty</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}