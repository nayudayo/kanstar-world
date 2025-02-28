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
    // Close explore dropdown if open
    if (isExploreOpen) setIsExploreOpen(false);
  };

  return (
    <>
      <nav ref={ref} className="navbar">
        <div className="navbar-container">
          {/* Main navbar container */}
          <div className="navbar-inner">
            {/* Animated gradient overlay */}
            <div className="navbar-gradient"></div>
            
            {/* Navigation content */}
            <div className="navbar-content">
              {/* Logo */}
              <Link href="/" className="navbar-logo">
                KANSTAR
              </Link>

              {/* Center Navigation - Hidden on mobile */}
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
                    style={{
                      left: '50%',
                      transform: 'translateX(-50%)',
                      top: '100%'
                    }}
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

              {/* Connect Wallet Button - Hidden on mobile */}
              <button className="navbar-wallet-button">
                CONNECT WALLET
              </button>

              {/* Hamburger Menu - Visible only on mobile */}
              <div 
                className={`hamburger-menu ${isMobileMenuOpen ? 'hamburger-active' : ''}`}
                onClick={toggleMobileMenu}
              >
                <div className="hamburger-icon">
                  <span className="hamburger-line"></span>
                  <span className="hamburger-line"></span>
                  <span className="hamburger-line"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-content">
          <a href="#heroes" className="mobile-menu-item" onClick={toggleMobileMenu}>HEROES</a>
          <a href="#lore" className="mobile-menu-item" onClick={toggleMobileMenu}>LORE</a>
          <a href="#roadmap" className="mobile-menu-item" onClick={toggleMobileMenu}>ROADMAP</a>
          <a href="#token" className="mobile-menu-item" onClick={toggleMobileMenu}>TOKEN</a>
          <a href="#nft" className="mobile-menu-item" onClick={toggleMobileMenu}>NFT</a>
          <Link href="/merch" className="mobile-menu-item" onClick={toggleMobileMenu}>SHOP</Link>
          <button className="mobile-menu-item text-left" onClick={toggleMobileMenu}>
            CONNECT WALLET
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={toggleMobileMenu}
      ></div>
    </>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar; 