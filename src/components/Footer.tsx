import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="relative w-full bg-black py-20 px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Socials */}
        <div className="space-y-6">
          <h4 className="text-white font-bold text-xl">Connect With Us</h4>
          <div className="flex gap-4">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              Twitter
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              Discord
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              Telegram
            </Link>
          </div>
        </div>

        {/* Team */}
        <div className="space-y-6">
          <h4 className="text-white font-bold text-xl">Team</h4>
          <ul className="space-y-3">
            <li>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/founders" className="text-gray-400 hover:text-white transition-colors">
                Founders
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Careers
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Partners
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="space-y-6">
          <h4 className="text-white font-bold text-xl">Quick Links</h4>
          <ul className="space-y-3">
            <li>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Marketplace
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Token
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Roadmap
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