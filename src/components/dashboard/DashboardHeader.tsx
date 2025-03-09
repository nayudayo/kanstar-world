import React from 'react';
import Link from 'next/link';

const DashboardHeader: React.FC = () => {
  return (
    <header className="w-full bg-black/50 backdrop-blur-sm border-b border-gray-600/50 py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-white text-xl font-bold">
            Kanstar World
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/user-dash" className="text-white hover:text-purple-400 transition-colors">
              Dashboard
            </Link>
            <Link href="/merch" className="text-white hover:text-purple-400 transition-colors">
              Marketplace
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-white">
            <span className="mr-2">Connected:</span>
            <span className="text-purple-400">0x1234...5678</span>
          </div>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
            Connect Wallet
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader; 