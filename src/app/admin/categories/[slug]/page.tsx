
import React from 'react';

export default function CategoryDetails({ params }: { params: { slug: string } }) {
  // ইউআরএল থেকে ক্যাটাগরির স্লাগ বা নাম নেওয়া হচ্ছে
  const { slug } = params;

  return (
    <div className="min-h-screen bg-white p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-black uppercase tracking-tighter italic border-b-8 border-black pb-4">
          Category: {slug.replace('-', ' ')}
        </h1>
        
        <p className="mt-6 text-gray-600 font-bold uppercase tracking-widest text-xs">
          Showing all products under {slug}
        </p>

        {/* এখানে পরে আমরা ব্যাকএন্ড থেকে প্রোডাক্টগুলো ফেচ করে দেখাবো */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-64 bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
            <span className="text-gray-400 font-bold italic">Product Placeholder</span>
          </div>
          {/* ... আরও প্রোডাক্ট কার্ড এখানে আসবে ... */}
        </div>
      </div>
    </div>
  );
}