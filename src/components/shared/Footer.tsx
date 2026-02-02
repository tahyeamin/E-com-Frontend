import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-xl font-black mb-4">PRIMETECH</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            The ultimate destination for premium tech gadgets. Quality guaranteed.
          </p>
        </div>
        
        <div>
          <h3 className="font-bold mb-4 uppercase text-xs tracking-widest text-gray-500">Shop</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/products" className="hover:text-white">All Products</Link></li>
            <li><Link href="/categories" className="hover:text-white">Categories</Link></li>
            <li><Link href="/offers" className="hover:text-white">Featured Offers</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4 uppercase text-xs tracking-widest text-gray-500">Support</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
            <li><Link href="/faq" className="hover:text-white">FAQs</Link></li>
            <li><Link href="/shipping" className="hover:text-white">Shipping Info</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4 uppercase text-xs tracking-widest text-gray-500">Newsletter</h3>
          <div className="flex gap-2 mt-2">
            <input type="email" placeholder="Your email" className="bg-gray-900 border border-gray-800 px-3 py-2 rounded text-sm w-full outline-none focus:border-blue-500" />
            <button className="bg-white text-black px-4 py-2 rounded text-sm font-bold hover:bg-gray-200">Join</button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-gray-900 text-center text-gray-500 text-xs">
        © 2026 PRIMETECH SHOP. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
};