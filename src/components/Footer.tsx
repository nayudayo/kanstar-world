import Link from 'next/link';
import Image from 'next/image';
import OptimizedVideo from './OptimizedVideo';
import { ASSET_MANIFEST } from '../config/assets';
import '../styles/footer.css';
import { forwardRef } from 'react';

const Footer = forwardRef<HTMLElement>((props, ref) => {
  return (
    <footer ref={ref} className="footer">
      <div className="footer-container footer-grid">
        {/* GIF Column */}
        <div className="footer-video">
          <OptimizedVideo
            webm={ASSET_MANIFEST.VIDEOS.FOOTER.webm}
            mp4={ASSET_MANIFEST.VIDEOS.FOOTER.mp4}
            fallbackImage={ASSET_MANIFEST.VIDEOS.FOOTER.fallback}
            alt={ASSET_MANIFEST.VIDEOS.FOOTER.alt}
            className="object-contain"
          />
        </div>

        {/* Connect */}
        <div className="footer-connect">
          <h4 className="footer-heading">Connect</h4>
          <div className="social-icons">
            <Link 
              href="https://discord.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
            >
              <Image
                src="/images/assets/social-icons/icon DC.png"
                alt="Discord"
                fill
                className="object-contain"
              />
            </Link>
            <Link 
              href="https://telegram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
            >
              <Image
                src="/images/assets/social-icons/icon TG.png"
                alt="Telegram"
                fill
                className="object-contain"
              />
            </Link>
            <Link 
              href="https://twitter.com/KanstarWorld" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
            >
              <Image
                src="/images/assets/social-icons/icon X.png"
                alt="X (Twitter)"
                fill
                className="object-contain"
              />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h4 className="footer-heading">Quick Links</h4>
          <ul>
            <li>
              <Link href="#roadmap" className="footer-link">
                Roadmap
              </Link>
            </li>
            <li>
              <Link href="#token" className="footer-link">
                Token
              </Link>
            </li>
            <li>
              <Link href="#collection" className="footer-link">
                Collection
              </Link>
            </li>
            <li>
              <Link href="#" className="footer-link">
                Shop <span className="text-sm">(Coming Soon)</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div className="footer-links">
          <h4 className="footer-heading">Legal</h4>
          <ul>
            <li>
              <Link href="#" className="footer-link">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="#" className="footer-link">
                IP Rights
              </Link>
            </li>
            <li>
              <Link href="#" className="footer-link">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="footer-link">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-copyright">
        <p className="copyright-text">
          © 2024 Kanstar. All rights reserved.
        </p>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer; 