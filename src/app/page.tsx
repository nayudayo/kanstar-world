"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NftShowcase from "../components/NftShowcase";
import LoreSection from "../components/LoreSection";
import RoadmapSlideshow from "../components/RoadmapSlideshow";
import Sidebar from "../components/Sidebar";

gsap.registerPlugin(ScrollTrigger);

// Asset preloader for large GIFs
const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

// Progressive loading queue
class LoadingQueue {
  private queue: string[] = [];
  private loading = false;

  add(src: string) {
    if (!this.queue.includes(src)) {
      this.queue.push(src);
      this.processQueue();
    }
  }

  private async processQueue() {
    if (this.loading || this.queue.length === 0) return;
    this.loading = true;
    
    const src = this.queue[0];
    try {
      await preloadImage(src);
      this.queue.shift();
    } catch (error) {
      console.error('Error loading image:', error);
    }
    
    this.loading = false;
    this.processQueue();
  }
}

const loadingQueue = new LoadingQueue();

// Asset paths
const ASSETS = {
  PLANET_GIF: '/images/Primordial Cell.gif',
  HEROES: '/images/assets/kanstar-heroes.png',
  SHIP: '/images/assets/ship/ship.png',
  BACKGROUND: '/images/backgrounds/cosmic-background.png',
  // Add other large assets here
};

export default function Home() {
  const [assetsLoaded, setAssetsLoaded] = useState<Record<string, boolean>>({});
  const [loadingProgress, setLoadingProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const navRef = useRef<HTMLElement>(null);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  // Preload essential assets
  useEffect(() => {
    const preloadAssets = async () => {
      const totalAssets = Object.keys(ASSETS).length;
      let loadedCount = 0;

      const updateProgress = () => {
        loadedCount++;
        setLoadingProgress((loadedCount / totalAssets) * 100);
      };

      // Start with the most important assets
      try {
        await preloadImage(ASSETS.BACKGROUND);
        updateProgress();
        setAssetsLoaded(prev => ({ ...prev, [ASSETS.BACKGROUND]: true }));

        // Load other assets progressively
        for (const [key, src] of Object.entries(ASSETS)) {
          if (key === 'BACKGROUND') continue;
          loadingQueue.add(src);
          await preloadImage(src);
          updateProgress();
          setAssetsLoaded(prev => ({ ...prev, [src]: true }));
        }
      } catch (error) {
        console.error('Error preloading assets:', error);
      }
    };

    preloadAssets();
  }, []);

  useLayoutEffect(() => {
    // Force scroll to top on mount
    window.scrollTo(0, 0);
    
    const ctx = gsap.context(() => {
      // Navbar initial animation (fade in only, no scroll behavior)
      gsap.fromTo(navRef.current,
        {
          y: -100,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          delay: 0.5
        }
      );

      // Create animations for each section
      sectionsRef.current.forEach((section, index) => {
        if (index === 0) {
          // First Section - Landing Page
          gsap.fromTo(section.querySelector('.content-container'),
            {
              opacity: 0,
              y: 50
            },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out",
              delay: 1
            }
          );
        } else if (index === 1) {
          // Second Section - Heroes Animation
          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "+=150%",
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            markers: false
          });

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=150%",
              scrub: 1.5,
              markers: false,
              anticipatePin: 1
            }
          });

          // Simple scale-up animation
          timeline
            .fromTo(".heroes-container", 
              {
                opacity: 0,
                scale: 0.001,
                filter: 'blur(20px)',
                transformOrigin: "center center"
              }, 
              {
                opacity: 0.3,
                scale: 0.3,
                filter: 'blur(10px)',
                duration: 0.3,
                ease: "power2.in"
              }
            )
            .to(".heroes-container", {
              opacity: 0.6,
              scale: 0.6,
              filter: 'blur(5px)',
              duration: 0.3,
              ease: "power2.inOut"
            })
            .to(".heroes-container", {
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
              duration: 0.4,
              ease: "power2.out"
            })
            .to(".heroes-container", {
              scale: 1.05,
              duration: 0.2,
              ease: "power1.inOut",
              yoyo: true,
              repeat: 1
            });
        } else if (index === 2) {
          // Third Section - Lore Section
          gsap.fromTo(section.querySelector('.crawl-container'),
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 1,
              ease: "power2.out",
            }
          );
        } else if (index === 5) {
          // Sixth Section - NFT Showcase
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top center+=20%",
              end: "top center-=20%",
              scrub: 0.5,
              markers: false,
              toggleActions: "play none none reverse"
            }
          });

          // Initial states
          gsap.set(section.querySelector('h2'), {
            opacity: 0,
            y: 30
          });

          gsap.set(section.querySelector('p'), {
            opacity: 0,
            y: 30
          });

          gsap.set(section.querySelector('[data-nft-slider]'), {
            opacity: 0,
            y: 50,
            scale: 0.95
          });

          // Animation sequence
          timeline
            .to(section.querySelector('h2'), {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out"
            })
            .to(section.querySelector('p'), {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out"
            }, "-=0.3")
            .to(section.querySelector('[data-nft-slider]'), {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              ease: "power2.out"
            }, "-=0.3");
        } else if (index !== 3 && index !== 4) { // Skip pin behavior for roadmap (3) and token (4) sections
          // Default pin behavior for other sections
          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "+=100%",
            pin: true,
            pinSpacing: true,
            markers: false
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative bg-black">
      <Navbar ref={navRef} />
      <Sidebar />

      {/* First Section - Landing Page */}
      <section ref={addToRefs} className="relative h-screen w-full pt-[80px]">
        <Image
          src={ASSETS.BACKGROUND}
          alt="Cosmic Background"
          fill
          className="object-cover -scale-x-100 z-[1]"
          priority
        />
        
        {/* Title Overlay */}
        <div className="absolute inset-0 flex items-center z-[2]">
          <div className="relative w-full bg-white/20 backdrop-blur-sm py-12 border-y border-white/10 overflow-visible">
            <div className="max-w-7xl mx-auto px-8 relative">
              {/* Planet Container - Positioned absolutely relative to the content container */}
              <div className="absolute left-[20%] top-[50%] -translate-x-1/2 -translate-y-1/2">
                <div className="relative w-[1100px] h-[1100px]">
                  {!assetsLoaded[ASSETS.PLANET_GIF] ? (
                    // Loading placeholder with progress
                    <div className="w-full h-full flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-full">
                      <div className="text-center">
                        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <div className="text-white text-lg">Loading Asset...</div>
                        <div className="text-blue-400 text-sm">{Math.round(loadingProgress)}%</div>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={ASSETS.PLANET_GIF}
                      alt="Planet"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        console.error('Error loading planet GIF:', e);
                        e.currentTarget.src = '/images/fallback-planet.png';
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Title Content */}
              <div className="text-right">
                <h1 className="text-white text-8xl font-bold tracking-[0.2em] title-glow">
                  KANSTAR<br />WORLD
                </h1>
                <p className="text-[#FFD700] text-2xl mt-6 tracking-[0.3em] subtitle-glow">
                  THE ULTIMATE COSMIC DOGGO
                </p>
              </div>
            </div>

            {/* Collection Button - Aligned with subtitle text */}
            <div className="absolute max-w-7xl w-full right-0 left-0 mx-auto px-8">
              <div className="flex justify-end">
                <button className="px-12 py-3 backdrop-blur-md bg-black/30 text-white hover:bg-black/40 transition-all duration-300 tracking-[0.2em] font-medium border-[2px] border-white collection-button-glow text-lg z-[3] translate-y-24">
                  CHECK COLLECTION
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Second Section - Heroes Animation */}
      <section id="heroes" ref={addToRefs} className="relative h-screen w-full overflow-hidden">
        <Image
          src="/images/backgrounds/cosmic-background.png"
          alt="Cosmic Background Rotated"
          fill
          className="object-cover rotate-180"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="heroes-container relative w-[1300px] h-[600px] opacity-0 scale-[0.01]">
            <Image
              src={ASSETS.HEROES}
              alt="Kanstar Heroes"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      {/* Third Section - Lore Section */}
      <section id="lore" ref={addToRefs} className="relative h-screen w-full">
        <Image
          src="/images/backgrounds/cosmic-background.png"
          alt="Cosmic Background"
          fill
          className="object-cover -scale-x-100"
          priority
        />
        <div className="absolute inset-0">
          <LoreSection />
        </div>
      </section>

      {/* Fourth Section - Roadmap */}
      <section id="roadmap" ref={addToRefs} className="relative h-screen w-full overflow-hidden">
        <Image
          src="/images/backgrounds/cosmic-background.png"
          alt="Cosmic Background"
          fill
          className="object-cover rotate-180"
          priority
        />
        <div className="absolute inset-0">
          <RoadmapSlideshow />
        </div>
      </section>

      {/* Fifth Section - Token Section */}
      <section id="token" ref={addToRefs} className="relative h-screen w-full">
        <Image
          src="/images/backgrounds/cosmic-background.png"
          alt="Cosmic Background"
          fill
          className="object-cover -scale-x-100"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Token Purchase Container */}
          <div className="flex items-center justify-between w-full max-w-[1920px] px-20">
            {/* Left Kanstar Container */}
            <div className="relative w-[800px] h-[800px] token-container">
              <div className="absolute inset-0 token-shadow">
                <Image
                  src="/images/token-section/token.GIF"
                  alt="Kanstar Token Left"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Center Text */}
            <div className="flex flex-col items-center gap-8 mx-10">
              <h2 className="text-white text-8xl font-bold tracking-[0.2em] title-glow text-center">
                PURCHASE
              </h2>
              <div className="text-[#FFA500] text-9xl font-bold tracking-[0.2em] token-glow text-center">
                $KANSTAR
              </div>
              <h2 className="text-white text-8xl font-bold tracking-[0.2em] title-glow text-center">
                TOKEN
              </h2>
            </div>

            {/* Right Kanstar Container */}
            <div className="relative w-[800px] h-[800px] token-container">
              <div className="absolute inset-0 token-shadow">
                <Image
                  src="/images/token-section/token.GIF"
                  alt="Kanstar Token Right"
                  fill
                  className="object-contain -scale-x-100"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sixth Section - NFT Showcase */}
      <section id="nft" ref={addToRefs} className="relative min-h-screen">
        <Image
          src="/images/backgrounds/cosmic-background.png"
          alt="Cosmic Background"
          fill
          className="object-cover -scale-y-100"
          priority
        />
        <div>
          <NftShowcase />
          <Footer />
        </div>
      </section>

      {/* Global styles */}
      <style jsx global>{`
        .title-glow {
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.8),
                      0 0 40px rgba(255, 255, 255, 0.6),
                      0 0 60px rgba(255, 255, 255, 0.4),
                      0 0 80px rgba(255, 255, 255, 0.2);
        }
        .subtitle-glow {
          text-shadow: 0 0 15px rgba(255, 215, 0, 0.8),
                      0 0 30px rgba(255, 215, 0, 0.6),
                      0 0 45px rgba(255, 215, 0, 0.4);
        }
        .token-glow {
          text-shadow: 0 0 20px rgba(255, 165, 0, 0.8),
                      0 0 40px rgba(255, 165, 0, 0.6),
                      0 0 60px rgba(255, 165, 0, 0.4),
                      0 0 80px rgba(255, 165, 0, 0.2);
        }
        .token-container {
          filter: drop-shadow(0 0 30px rgba(0, 255, 255, 0.3))
                  drop-shadow(0 0 60px rgba(0, 255, 255, 0.2));
        }
        .token-shadow {
          filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.4))
                  drop-shadow(0 0 40px rgba(255, 255, 255, 0.3));
        }
        .collection-button-glow {
          box-shadow: 0 0 15px rgba(0, 255, 255, 0.5),
                     0 0 30px rgba(0, 255, 255, 0.3),
                     inset 0 0 15px rgba(0, 255, 255, 0.3);
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
        }
      `}</style>
    </div>
  );
}
