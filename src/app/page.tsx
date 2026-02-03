'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get('/products');
                setProducts(res.data);
            } catch (err) {
                console.error("Discovery Failed");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0F172A]">
                <Loader2 className="animate-spin text-blue-600" size={64} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            
            {/* ১. হিরো সেকশন */}
            <section 
                className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden bg-[#0F172A]"
                style={{ 
                    backgroundImage: `url('/hero-bg.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <div className="absolute inset-0 bg-black/60 z-0"></div>

                <div className="relative z-10 text-center px-6 max-w-6xl flex flex-col items-center justify-center space-y-24 py-20"> 
                    <span className="text-white/60 font-black uppercase tracking-[1em] text-[10px] block">
                        your destination
                    </span>
                    <p className="text-gray-200 text-3xl md:text-5xl font-black max-w-4xl mx-auto leading-tight italic drop-shadow-2xl uppercase tracking-tighter">
                        Get your desired gadgets
                    </p>
                    <button className="relative px-20 py-6 rounded-full font-black uppercase tracking-[0.4em] text-xs text-white bg-black/40 backdrop-blur-md border border-white/20 transition-all duration-300 hover:bg-black hover:border-blue-600 active:scale-95 z-10">
                        Browse Inventory
                    </button>
                </div>
            </section>

           {/* ২. ক্যাটাগরি সেকশন - প্রিমিয়াম কার্ড ডিজাইন */}
<section className="max-w-7xl mx-auto px-6 py-40">
    <div className="flex flex-col gap-8 mb-24 text-center">
        <span className="text-blue-500 font-black uppercase tracking-[0.8em] text-[10px] block">Gear Categories</span>
        <h2 className="text-7xl font-black uppercase italic tracking-tighter text-gray-900 drop-shadow-sm">
            Primary <span className="text-blue-600">Sectors</span>
        </h2>
        <div className="h-2 w-32 bg-blue-600 mx-auto"></div>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {['Mouse', 'Keyboard', 'GPU', 'Monitor'].map((cat) => (
            <div 
                key={cat} 
                className="group relative h-64 flex items-center justify-center overflow-hidden rounded-[40px] bg-gray-50 border-2 border-gray-100 transition-all duration-500 hover:border-blue-600 hover:shadow-[0_20px_50px_rgba(37,99,235,0.2)] cursor-pointer"
            >
                {/* হোভার করলে যে নীল গ্লো আসবে */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-blue-600/0 group-hover:from-blue-600 group-hover:to-blue-800 opacity-0 group-hover:opacity-100 transition-all duration-500 z-0"></div>
                
                {/* টেক্সট কন্টেন্ট */}
                <div className="relative z-10 text-center space-y-4">
                    <h3 className="text-xl font-black uppercase tracking-[0.3em] text-gray-400 group-hover:text-white transition-colors duration-300">
                        {cat}
                    </h3>
                    <div className="w-0 h-1 bg-white mx-auto group-hover:w-12 transition-all duration-500"></div>
                </div>

                {/* ডেকোরেটিভ ব্যাকগ্রাউন্ড নাম্বার */}
                <span className="absolute -bottom-4 -right-4 text-8xl font-black text-black/[0.03] group-hover:text-white/10 transition-colors">
                    {cat[0]}
                </span>
            </div>
        ))}
    </div>
</section>

            {/* ৩. Featured Products Section - বড় বোল্ড টাইটেল সহ */}
            <section className="bg-[#0F172A] py-40 text-white border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    
                    {/* হেডার অংশ: বড় বোল্ড টাইটেল */}
                    <div className="text-center mb-32 space-y-8">
                        <h2 className="text-8xl md:text-9xl font-black uppercase italic tracking-tighter text-white drop-shadow-[0_5px_15px_rgba(37,99,235,0.4)]">
                            Featured <br /> <span className="text-blue-600">Products</span>
                        </h2>
                        <div className="h-2 w-48 bg-blue-600 mx-auto"></div>
                        <span className="text-blue-500 font-black uppercase tracking-[0.8em] text-[12px] block">Strategic Selection</span>
                    </div>

                    {/* গ্রিড লেআউট - ৪টি প্রোডাক্ট */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {products.slice(0, 4).map((product) => (
                            <Link href={`/products/${product.id}`} key={product.id} className="group space-y-8">
                                <div className="aspect-square bg-white/5 border border-white/10 rounded-[50px] flex items-center justify-center p-10 hover:bg-white hover:border-white transition-all duration-500 overflow-hidden">
                                    <img 
                                        src={`http://localhost:3000${product.image[0].startsWith('/') ? '' : '/'}${product.image[0]}`}
                                        className="w-full h-full object-contain group-hover:invert transition-all duration-500 group-hover:scale-110"
                                        alt={product.name}
                                    />
                                </div>
                                <div className="space-y-3 text-center">
                                    <h3 className="text-xl font-black uppercase italic group-hover:text-blue-500 transition-colors leading-tight">{product.name}</h3>
                                    <p className="text-3xl font-black text-blue-500 tracking-tighter">${product.price}</p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-24 text-center">
                        <Link href="/shop" className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em] text-white/50 hover:text-blue-500 transition-all group">
                            View Full Collection <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ৪. Best Selling Section - বড় বোল্ড টাইটেল সহ */}
            <section className="bg-[#0A101E] py-40 text-white">
                <div className="max-w-7xl mx-auto px-6">
                    
                    {/* হেডার অংশ: বড় বোল্ড টাইটেল */}
                    <div className="text-center mb-32 space-y-8">
                        <h2 className="text-8xl md:text-9xl font-black uppercase italic tracking-tighter text-white">
                            Best <span className="text-blue-600">Selling</span>
                        </h2>
                        <div className="h-2 w-48 bg-blue-600 mx-auto"></div>
                        <p className="text-gray-400 font-medium tracking-[0.6em] uppercase text-xs">Field Tested // High Demand</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12">
                        {products.slice(0, 4).map((product) => (
                            <Link href={`/products/${product.id}`} key={product.id} className="group space-y-8">
                                <div className="aspect-square bg-white/5 border border-white/10 rounded-[50px] flex items-center justify-center p-10 hover:bg-white hover:border-white transition-all duration-500 overflow-hidden">
                                    <img 
                                        src={`http://localhost:3000${product.image[0].startsWith('/') ? '' : '/'}${product.image[0]}`}
                                        className="w-full h-full object-contain group-hover:invert transition-all duration-500"
                                        alt={product.name}
                                    />
                                </div>
                                <div className="space-y-2 text-center">
                                    <h3 className="text-xl font-black uppercase italic group-hover:text-blue-500 transition-colors">{product.name}</h3>
                                    <p className="text-3xl font-black text-blue-500 tracking-tighter">${product.price}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}