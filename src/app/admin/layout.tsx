'use client';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Check if user is logged in AND has ADMIN role
    if (!user || user.role?.toLowerCase() !== 'admin') {
      router.push('/'); // Redirect unauthorized users to home
    } else {
      setIsAuthorized(true);
    }
  }, [user, router]);

  if (!isAuthorized) {
    return <div className="h-screen flex items-center justify-center bg-white">Loading Admin Panel...</div>;
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar and Content here */}
      <aside className="w-64 bg-black text-white p-6">
          <h2 className="font-black text-xl mb-10">ADMIN</h2>
          {/* Admin links... */}
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}