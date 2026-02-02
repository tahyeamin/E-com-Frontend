'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserPlus } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import api from '@/lib/axios';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Backend registration API call
      await api.post('/auth/register', formData);
      
      toast.success('Registration successful! Please login.');
      router.push('/login'); // Redirect to login page
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-lg border">
      <div className="flex flex-col items-center mb-8">
        <div className="p-3 bg-green-100 rounded-full text-green-600 mb-4">
          <UserPlus size={32} />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
        <p className="text-gray-500 text-sm">Join us to start shopping</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          placeholder="John Doe"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
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
          Sign Up
        </Button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <button 
            type="button"
            onClick={() => router.push('/login')}
            className="text-blue-600 font-semibold hover:underline"
          >
            Login here
          </button>
        </p>
      </form>
    </div>
  );
}