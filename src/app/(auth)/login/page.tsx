'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import api from '@/lib/axios';
import { useAuthStore } from '@/store/useAuthStore';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Backend login API call
      const { data } = await api.post('/auth/login', formData);
      
      // Saving user and token in the store
      setAuth(data.user, data.access_token);
      
      toast.success('Login successful!');
      router.push('/'); // Redirecting to home page
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-lg border">
      <div className="flex flex-col items-center mb-8">
        <div className="p-3 bg-blue-100 rounded-full text-blue-600 mb-4">
          <LogIn size={32} />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Login</h1>
        <p className="text-gray-500 text-sm">Access your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          placeholder="example@mail.com"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          required
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        
        <Button 
          type="submit" 
          className="w-full mt-2" 
          isLoading={loading}
        >
          Login
        </Button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{' '}
          <button 
            type="button"
            onClick={() => router.push('/register')}
            className="text-blue-600 font-semibold hover:underline"
          >
            Register here
          </button>
        </p>
      </form>
    </div>
  );
}