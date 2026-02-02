'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/axios';
import { useAuthStore } from '@/store/useAuthStore';
import Cookies from 'js-cookie';
import { Loader2, Mail, Lock, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const router = useRouter();
  const { setUser } = useAuthStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // ১. ব্যাকএন্ডে এপিআই কল
      const { data } = await api.post('/auth/login', { email, password });

      // ২. কুকিতে টোকেন এবং রোল সেট করা (মিডলওয়্যারের জন্য)
      Cookies.set('token', data.access_token, { expires: 7 });
      Cookies.set('role', data.user.role, { expires: 7 });

      // ৩. Zustand Store এবং LocalStorage আপডেট
      setUser(data.user);
      localStorage.setItem('token', data.access_token);

      toast.success('Login Successful!');
      
      // ৪. রোল অনুযায়ী রিডাইরেক্ট
      if (data.user.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/');
      }
      
    } catch (err: any) {
      console.error("Login Error:", err.response?.data);
      const msg = err.response?.data?.message || "Invalid email or password";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black tracking-tighter uppercase">Welcome <span className="text-blue-600">Back</span></h1>
          <p className="text-gray-500 text-sm mt-2">Enter your credentials to access your account</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-center gap-3 text-sm animate-shake">
            <AlertCircle size={18} />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="admin@primetech.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "SIGN IN"}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-gray-600">
          Don't have an account? <Link href="/register" className="text-blue-600 font-bold hover:underline">Register Now</Link>
        </p>
      </div>
    </div>
  );
}