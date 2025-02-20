import { forwardRef, useState } from 'react';
import Link from 'next/link';

interface NavbarProps {
  className?: string;
}

const Navbar = forwardRef<HTMLElement, NavbarProps>((props, ref) => {
  const [isExploreOpen, setIsExploreOpen] = useState(false);

  return (
    <nav ref={ref} className="fixed top-0 left-0 w-full z-[200] px-8 py-3">
      <div className="max-w-7xl mx-auto">
        {/* Main navbar container with neon effect */}
        <div className="relative backdrop-blur-md bg-black/10 border-[3px] border-white overflow-hidden nav-container-glow flex items-center">
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0066ff]/30 via-[#00ffff]/30 to-[#0066ff]/30"></div>
          
          {/* Navigation content */}
          <div className="relative px-8 flex items-center justify-between w-full min-h-[40px]">
            {/* Logo */}
            <Link href="/" className="text-white font-bold text-xl tracking-[0.2em] hover:text-[#00ffff] transition-colors duration-300 text-glow-blue flex items-center justify-center h-[40px]">
              KANSTAR
            </Link>

            {/* Center Navigation */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-16">
              {/* Explore Dropdown */}
              <div className="relative group flex items-center h-full">
                <button 
                  className="text-white hover:text-[#00ffff] transition-all duration-300 tracking-[0.2em] font-medium nav-text-glow text-sm flex items-center leading-none"
                  onMouseEnter={() => setIsExploreOpen(true)}
                  onMouseLeave={() => setIsExploreOpen(false)}
                >
                  EXPLORE
                </button>
                {/* Dropdown Menu */}
                <div 
                  className={`fixed mt-2 py-2 w-48 backdrop-blur-md bg-black/80 border border-white rounded-lg shadow-xl transition-all duration-300 z-[201] ${
                    isExploreOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'
                  }`}
                  style={{
                    left: '50%',
                    transform: 'translateX(-50%)',
                    top: '100%'
                  }}
                  onMouseEnter={() => setIsExploreOpen(true)}
                  onMouseLeave={() => setIsExploreOpen(false)}
                >
                  <div className="relative">
                    <a href="#heroes" className="block px-4 py-2 text-white hover:text-[#00ffff] hover:bg-white/10 transition-colors duration-300 text-sm tracking-wider leading-none">
                      HEROES
                    </a>
                    <a href="#lore" className="block px-4 py-2 text-white hover:text-[#00ffff] hover:bg-white/10 transition-colors duration-300 text-sm tracking-wider leading-none">
                      LORE
                    </a>
                    <a href="#roadmap" className="block px-4 py-2 text-white hover:text-[#00ffff] hover:bg-white/10 transition-colors duration-300 text-sm tracking-wider leading-none">
                      ROADMAP
                    </a>
                    <a href="#token" className="block px-4 py-2 text-white hover:text-[#00ffff] hover:bg-white/10 transition-colors duration-300 text-sm tracking-wider leading-none">
                      TOKEN
                    </a>
                    <a href="#nft" className="block px-4 py-2 text-white hover:text-[#00ffff] hover:bg-white/10 transition-colors duration-300 text-sm tracking-wider leading-none">
                      NFT
                    </a>
                  </div>
                </div>
              </div>
              <Link href="/merch" className="text-white hover:text-[#00ffff] transition-all duration-300 tracking-[0.2em] font-medium nav-text-glow text-sm flex items-center leading-none">
                SHOP
              </Link>
            </div>

            {/* Connect Wallet Button */}
            <button className="px-8 py-[6px] backdrop-blur-md bg-black/30 text-white hover:bg-black/40 transition-all duration-300 tracking-[0.2em] font-medium border-[2px] border-white collection-button-glow text-sm flex items-center leading-none">
              CONNECT WALLET
            </button>
          </div>
        </div>
      </div>

      {/* Add the style tag for the glow effects */}
      <style jsx>{`
        .nav-container-glow {
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.5),
                      0 0 40px rgba(0, 255, 255, 0.4),
                      0 0 60px rgba(0, 255, 255, 0.3),
                      0 0 80px rgba(0, 255, 255, 0.2),
                      0 0 100px rgba(0, 255, 255, 0.1),
                      inset 0 0 30px rgba(0, 255, 255, 0.3),
                      inset 0 0 50px rgba(0, 102, 255, 0.3);
        }
        .text-glow-blue {
          text-shadow: 0 0 10px #00ffff,
                       0 0 20px #00ffff,
                       0 0 30px #00ffff,
                       0 0 40px #00ffff,
                       0 0 50px #0066ff,
                       0 0 60px #0066ff,
                       0 0 70px #0066ff,
                       0 0 80px rgba(255, 255, 255, 0.8),
                       0 0 90px rgba(0, 255, 255, 0.7);
        }
        .nav-text-glow {
          text-shadow: 0 0 15px rgba(0, 255, 255, 1),
                       0 0 25px rgba(0, 255, 255, 0.8),
                       0 0 35px rgba(0, 102, 255, 0.7),
                       0 0 45px rgba(0, 102, 255, 0.6),
                       0 0 55px rgba(255, 255, 255, 0.5);
        }
        .collection-button-glow {
          box-shadow: 0 0 15px rgba(0, 255, 255, 0.5),
                     0 0 30px rgba(0, 255, 255, 0.3),
                     inset 0 0 15px rgba(0, 255, 255, 0.3);
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
        }
      `}</style>
    </nav>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar; 