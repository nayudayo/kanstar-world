import { forwardRef } from 'react';
import Link from 'next/link';

interface NavbarProps {
  className?: string;
}

const Navbar = forwardRef<HTMLElement, NavbarProps>((props, ref) => {
  return (
    <nav ref={ref} className="fixed top-0 left-0 w-full z-50 px-8 py-4">
      <div className="max-w-7xl mx-auto">
        {/* Blur backdrop with animated gradient border */}
        <div className="relative backdrop-blur-md bg-black/10 rounded-2xl border border-white/10 overflow-hidden">
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-gradient-x"></div>
          
          {/* Navigation content */}
          <div className="relative px-8 py-4 flex items-center justify-between">
            <Link href="/" className="text-white font-bold text-2xl tracking-wider hover:text-blue-400 transition-colors duration-300">
              KANSTAR
            </Link>
            <div className="flex items-center gap-12">
              <Link href="#" className="text-white/80 hover:text-white transition-all duration-300 relative group">
                <span className="relative z-10">Explore</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="#" className="text-white/80 hover:text-white transition-all duration-300 relative group">
                <span className="relative z-10">Collection</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/merch" className="text-white/80 hover:text-white transition-all duration-300 relative group">
                <span className="relative z-10">Merch</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <button 
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40"
              >
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar; 