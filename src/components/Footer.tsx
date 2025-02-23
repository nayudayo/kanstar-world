import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="relative w-full bg-black py-20 px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* GIF Column */}
        <div className="relative w-full h-[200px]">
          <Image
            src="/images/assets/footer.gif"
            alt="Kanstar Coin Animation"
            fill
            className="object-contain"
          />
        </div>

        {/* Connect */}
        <div className="space-y-6">
          <h4 className="text-white font-bold text-xl">Connect</h4>
          <div className="flex gap-6">
            <Link 
              href="https://discord.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="relative w-12 h-12 transition-transform hover:scale-110"
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
              className="relative w-12 h-12 transition-transform hover:scale-110"
            >
              <Image
                src="/images/assets/social-icons/icon TG.png"
                alt="Telegram"
                fill
                className="object-contain"
              />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-6">
          <h4 className="text-white font-bold text-xl">Quick Links</h4>
          <ul className="space-y-3">
            <li>
              <Link href="#roadmap" className="text-gray-400 hover:text-white transition-colors">
                Roadmap
              </Link>
            </li>
            <li>
              <Link href="#token" className="text-gray-400 hover:text-white transition-colors">
                Token
              </Link>
            </li>
            <li>
              <Link href="#collection" className="text-gray-400 hover:text-white transition-colors">
                Collection
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Shop <span className="text-sm">(Coming Soon)</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div className="space-y-6">
          <h4 className="text-white font-bold text-xl">Legal</h4>
          <ul className="space-y-3">
            <li>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                IP Rights
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10">
        <p className="text-gray-400 text-center">
          © 2024 Kanstar. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer; 