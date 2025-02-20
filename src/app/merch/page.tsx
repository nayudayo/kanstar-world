"use client";

import Image from 'next/image';
import { useRef } from 'react';
import Navbar from '../../components/Navbar';
import OptimizedVideo from '../../components/OptimizedVideo';

export default function MerchPage() {
  const navRef = useRef<HTMLElement>(null);

  return (
    <div className="relative min-h-screen bg-black flex flex-col">
      <Navbar ref={navRef} />
      
      {/* Background */}
      <Image
        src="/images/backgrounds/cosmic-background.png"
        alt="Cosmic Background"
        fill
        className="object-cover"
        priority
      />
      
      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-8">
        <div className="relative w-[400px] h-[400px]">
          <OptimizedVideo
            webm="/videos/assets/merch/Merch.GIF.webm"
            mp4="/videos/assets/merch/Merch.GIF.mp4"
            fallbackImage="/images/assets/merch/Merch.GIF"
            alt="Merch"
            className="w-full h-full object-contain"
          />
        </div>
        <p className="text-white text-2xl font-bold animate-pulse">
          Wait! I am still changing!
        </p>
      </div>
    </div>
  );
} 