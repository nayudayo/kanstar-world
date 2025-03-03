import { forwardRef, useState } from 'react';
import Link from 'next/link';
import '../styles/navbar.css';

interface NavbarProps {
  className?: string;
}

const Navbar = forwardRef<HTMLElement, NavbarProps>((props, ref) => {
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isExploreOpen) setIsExploreOpen(false);
  };

  return (
    <nav ref={ref} className="navbar">
      <div className="navbar-container">
        <div className="navbar-inner">
          <div className="navbar-gradient"></div>
          
          <div className="navbar-content">
            {/* Logo */}
            <Link href="/" className="navbar-logo">
              KANSTAR
            </Link>

            {/* Desktop Navigation */}
            <div className="navbar-center">
              {/* Explore Dropdown */}
              <div className="navbar-dropdown">
                <button 
                  className="navbar-dropdown-button"
                  onMouseEnter={() => setIsExploreOpen(true)}
                  onMouseLeave={() => setIsExploreOpen(false)}
                >
                  EXPLORE
                </button>
                {/* Dropdown Menu */}
                <div 
                  className={`navbar-dropdown-menu ${
                    isExploreOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'
                  }`}
                  onMouseEnter={() => setIsExploreOpen(true)}
                  onMouseLeave={() => setIsExploreOpen(false)}
                >
                  <a href="#heroes" className="navbar-dropdown-item">HEROES</a>
                  <a href="#lore" className="navbar-dropdown-item">LORE</a>
                  <a href="#roadmap" className="navbar-dropdown-item">ROADMAP</a>
                  <a href="#token" className="navbar-dropdown-item">TOKEN</a>
                  <a href="#nft" className="navbar-dropdown-item">NFT</a>
                </div>
              </div>
              <Link href="/merch" className="navbar-dropdown-button">
                SHOP
              </Link>
            </div>

            {/* Desktop Wallet Button */}
            <button className="navbar-wallet-button">
              CONNECT WALLET
            </button>

            {/* Mobile Menu */}
            <div className="mobile-menu-container">
              <button 
                className={`mobile-menu-button ${isMobileMenuOpen ? 'active' : ''}`}
                onClick={toggleMobileMenu}
              >
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
              </button>
              
              {/* Mobile Dropdown Menu */}
              <div className={`mobile-dropdown ${isMobileMenuOpen ? 'active' : ''}`}>
                <a href="#heroes" className="mobile-dropdown-item" onClick={toggleMobileMenu}>HEROES</a>
                <a href="#lore" className="mobile-dropdown-item" onClick={toggleMobileMenu}>LORE</a>
                <a href="#roadmap" className="mobile-dropdown-item" onClick={toggleMobileMenu}>ROADMAP</a>
                <a href="#token" className="mobile-dropdown-item" onClick={toggleMobileMenu}>TOKEN</a>
                <a href="#nft" className="mobile-dropdown-item" onClick={toggleMobileMenu}>NFT</a>
                <Link href="/merch" className="mobile-dropdown-item" onClick={toggleMobileMenu}>SHOP</Link>
                <button className="mobile-dropdown-item wallet-button" onClick={toggleMobileMenu}>
                  CONNECT WALLET
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar; 