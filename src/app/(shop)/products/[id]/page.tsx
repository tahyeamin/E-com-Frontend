'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { ShoppingCart, ChevronLeft, Star, ShieldCheck, Truck, Loader2, Minus, Plus } from 'lucide-react';

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await api.get(`/products/${id}`);
                setProduct(res.data);
            } catch (err) {
                console.error("Product Intel Failed");
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchProduct();
    }, [id]);

    if (loading) return <div className="h-screen flex items-center justify-center font-black uppercase tracking-widest text-gray-400"><Loader2 className="animate-spin mr-2" /> Loading Gear...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            {/* Top Section: Photo (Left) and Price/CTA (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

                {/* 1. Left Side: Product Photo */}
                <div className="bg-white border border-gray-100 rounded-2xl p-6 flex items-center justify-center overflow-hidden shadow-sm">
                    <img
                        src={`http://localhost:3000${product.image[0].startsWith('/') ? '' : '/'}${product.image[0]}`}
                        className="w-full h-auto max-h-[500px] object-contain hover:scale-105 transition-transform duration-500"
                        alt={product.name}
                    />
                </div>

               {/* Right Side: Product Specs & Actions - সুপার স্পেসড লেআউট */}
<div className="flex-1 flex flex-col justify-start space-y-20 py-10"> 
    
    {/* ১. হেডার সেকশন (টাইটেল ও আইডি) - নিচে বিশাল গ্যাপ */}
    <div className="flex flex-col gap-8"> 
        <div>
            <span className="text-blue-600 text-[12px] font-black uppercase tracking-[0.6em] italic block mb-6">
                Hardware ID: {product.id}
            </span>
            <h1 className="text-7xl font-black uppercase italic tracking-tighter text-gray-900 leading-[0.85]">
                {product.name}
            </h1>
        </div>
        <div className="flex items-center gap-4">
            <div className="flex text-orange-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
            </div>
            <span className="text-[11px] font-black uppercase text-gray-400 tracking-[0.3em]">
                (4.8 Intel Rating)
            </span>
        </div>
    </div>

    {/* ২. প্রাইস সেকশন - একা একটা বড় জায়গায় থাকবে */}
    <div className="py-12 border-y border-gray-100 flex flex-col gap-4"> 
        <p className="text-[11px] font-black uppercase text-gray-400 tracking-[0.3em]">Acquisition Cost</p>
        <p className="text-7xl font-black italic text-gray-900 tracking-tighter">
            ${product.price}
        </p>
    </div>

    {/* ৩. কোয়ান্টিটি সিলেক্টর */}
    <div className="flex flex-col gap-8">
        <p className="text-[11px] font-black uppercase text-gray-400 tracking-[0.3em]">Select Units Required</p>
        <div className="flex items-center w-max border-2 border-gray-900 rounded-[30px] overflow-hidden shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
            <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                className="p-6 hover:bg-gray-100 transition-colors border-r-2 border-gray-900"
            >
                <Minus size={24} />
            </button>
            <span className="px-16 font-black text-4xl tabular-nums">{quantity}</span>
            <button 
                onClick={() => setQuantity(quantity + 1)} 
                className="p-6 hover:bg-gray-100 transition-colors border-l-2 border-gray-900"
            >
                <Plus size={24} />
            </button>
        </div>
    </div>

    {/* ৪. অ্যাকশন বাটন সেকশন */}
    <div className="flex flex-col gap-10">
        <button className="w-full bg-black text-white py-10 rounded-[50px] font-black uppercase tracking-[0.4em] text-sm hover:bg-blue-600 transition-all shadow-2xl flex items-center justify-center gap-6 active:scale-95 group">
            <ShoppingCart size={28} className="group-hover:translate-x-2 transition-transform" /> 
            Acquire Module
        </button>
        
        <div className="flex items-center justify-center gap-4">
            <div className={`w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
            <p className={`text-[11px] font-black uppercase tracking-[0.3em] ${product.stock > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `Stock Verified: ${product.stock} Units Available` : 'Supply Line Empty'}
            </p>
        </div>
    </div>

    {/* ৫. ট্রাস্ট ব্যাজ - */}
    <div className="grid grid-cols-2 gap-12 pt-16 border-t-2 border-gray-100">
        <div className="flex items-center gap-5">
            <Truck className="text-blue-600" size={32} />
            <span className="text-[10px] font-black uppercase tracking-widest leading-tight text-gray-500">Fast Tactical<br/>Drop System</span>
        </div>
        <div className="flex items-center gap-5">
            <ShieldCheck className="text-emerald-600" size={32} />
            <span className="text-[10px] font-black uppercase tracking-widest leading-tight text-gray-500">Secure Gear<br/>Verification</span>
        </div>
    </div>
</div>

            </div>
{/* Bottom Section: Description  */}
            <div className="mt-32 border-t-4 border-black pt-20">
                <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-12 underline decoration-blue-600 underline-offset-8">Product Description</h2>
                <div className="bg-gray-50 p-12 lg:p-20 rounded-[50px] border border-gray-100">
                    <p className="text-gray-700 leading-relaxed text-2xl font-medium max-w-5xl italic">
                        {product.description || "Field intelligence reports no description for this module. Classified gear."}
                    </p>
                </div>
            </div>

        </div>
    );
}