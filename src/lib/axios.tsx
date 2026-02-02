import axios from 'axios';

const api = axios.create({
  // .env.local থেকে ব্যাকএন্ড ইউআরএল নিবে
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
});

// রিকোয়েস্ট পাঠানোর সময় অটোমেটিক টোকেন যোগ করার জন্য ইন্টারসেপ্টর
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;