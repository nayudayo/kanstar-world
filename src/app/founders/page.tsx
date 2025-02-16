"use client";

import Image from 'next/image';
import { useRef } from 'react';
import Navbar from '../../components/Navbar';
import '@/styles/glow.css';

export default function FoundersPage() {
  const navRef = useRef<HTMLElement>(null);

  return (
    <div className="relative h-screen bg-black flex flex-col overflow-hidden">
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
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 overflow-hidden">
        <div className="max-w-6xl w-full space-y-12 mt-24">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-glow-lg">Meet Kanstar&apos;s founders</h1>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text gradient-text-glow">
              Zio & Lima
            </h2>
          </div>

          {/* Founders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Zio */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-[250px] h-[250px] md:w-[300px] md:h-[300px] rounded-full overflow-hidden border-4 border-blue-500/30">
                <Image
                  src="/images/founders/founder1.png"
                  alt="Zio"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2 text-center">
                <h3 className="text-2xl font-bold text-white text-glow-blue">Zio</h3>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base text-glow-sm">
                  Former Navy Officer, brilliant engineer, creative mastermind, and viral crypto-surrealism video creator sensation.
                </p>
              </div>
            </div>

            {/* Lima */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-[250px] h-[250px] md:w-[300px] md:h-[300px] rounded-full overflow-hidden border-4 border-purple-500/30">
                <Image
                  src="/images/founders/founder2.png"
                  alt="Lima"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2 text-center">
                <h3 className="text-2xl font-bold text-white text-glow-purple">Lima</h3>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base text-glow-sm">
                  Former Latam Lead for Ronin and Axie, sharp community-driven growth strategist, with a passion for salsa dancing.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 space-y-4 bg-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-sm border border-white/10">
            <h3 className="text-xl md:text-2xl font-bold text-white text-glow text-center">Their Story</h3>
            <ul className="space-y-4">
              <li className="flex gap-4 text-gray-300">
                <span className="text-purple-400 shrink-0 text-glow-purple">•</span>
                <p className="text-sm md:text-base text-glow-sm">Best friends for over a decade, they co-founded <span className="text-glow-blue">@Kind_HQ</span>, which started as a guild in 2021 and evolved into a global creators&apos; powerhouse.</p>
              </li>
              <li className="flex gap-4 text-gray-300">
                <span className="text-purple-400 shrink-0 text-glow-purple">•</span>
                <p className="text-sm md:text-base text-glow-sm">Both are dads to princesses, love pin-pong, Pokemon TCG collectors, die-hard Axie fans and proud <span className="text-glow-blue">@Ronin_Network</span> ambassadors. They&apos;ve also been awarded honorary doctorates by the UNESCO for their contributions to the development of technology in LATAM.</p>
              </li>
              <li className="flex gap-4 text-gray-300">
                <span className="text-purple-400 shrink-0 text-glow-purple">•</span>
                <p className="text-sm md:text-base text-glow-sm">Together, they bring over <span className="text-glow">14 million followers</span> across web2 through their personal projects, they&apos;ll be leveraging this reach to catapult Kanstar into mainstream media in 2025.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 