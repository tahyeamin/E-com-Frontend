'use client';
import { useState, useEffect } from 'react';
import api from '@/lib/axios'; // আপনার এক্সিওস পাথ চেক করুন
import { useRouter } from 'next/navigation';

export default function CreateCategoryPage() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);
    const router = useRouter();

    // টোকেন চেক করার জন্য একটি সিম্পল ইফেক্ট
    useEffect(() => {
        const token = localStorage.getItem('token'); // আপনার টোকেনের নাম 'token' নাকি 'access_token' দেখে নিন
        if (!token) {
            console.warn("No token found, but staying on page for debugging.");
            // router.push('/login'); // রিডাইরেক্ট আপাতত বন্ধ রাখা হলো
        }
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            // আপনার ব্যাকএন্ড এন্ডপয়েন্টকে হিট করছে
            const res = await api.post('/categories', { 
                name, 
                description 
            });

            if (res.status === 201) {
                setStatus({ type: 'success', msg: `Sector "${name}" deployed successfully!` });
                setName('');
                setDescription('');
            }
        } catch (err: any) {
            // DTO বা গার্ডের এরর মেসেজ দেখাবে
            const errorMsg = err.response?.data?.message || "Deployment failed. Check if you are Admin.";
            setStatus({ type: 'error', msg: Array.isArray(errorMsg) ? errorMsg[0] : errorMsg });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white/5 border border-white/10 p-10 rounded-[40px] shadow-2xl backdrop-blur-xl">
                
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">
                        New <span className="text-blue-600">Category</span>
                    </h1>
                    <p className="text-gray-500 text-[10px] uppercase tracking-[0.4em] mt-2">Admin Command Center</p>
                </div>
                
                <form onSubmit={handleCreate} className="space-y-8">
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 block mb-3 ml-2">Sector Name</label>
                        <input 
                            className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-blue-600 transition-all placeholder:text-gray-700"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. PERIPHERALS"
                            required
                            minLength={3} // আপনার DTO অনুযায়ী
                        />
                    </div>

                    <div>
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 block mb-3 ml-2">Description</label>
                        <textarea 
                            className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-blue-600 transition-all h-32 placeholder:text-gray-700 resize-none"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Briefly describe this hardware sector..."
                        />
                    </div>

                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 py-5 rounded-full font-black uppercase tracking-[0.5em] text-[10px] text-white hover:bg-white hover:text-black transition-all active:scale-95 disabled:opacity-50 shadow-[0_0_30px_rgba(37,99,235,0.3)]"
                    >
                        {loading ? 'Initializing...' : 'Deploy Sector'}
                    </button>
                </form>

                {status && (
                    <div className={`mt-8 p-4 rounded-2xl border text-center text-[10px] font-black uppercase tracking-widest ${
                        status.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
                    }`}>
                        {status.msg}
                    </div>
                )}

                <div className="mt-8 text-center">
                    <button onClick={() => router.push('/')} className="text-gray-600 text-[9px] uppercase tracking-[0.4em] hover:text-white transition-colors">
                        ← Back to Tactical Hub
                    </button>
                </div>
            </div>
        </div>
    );
}