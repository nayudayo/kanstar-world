"use client";

import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Navbar from "../components/Navbar";
import dynamic from 'next/dynamic';

// Dynamic imports for heavy components
const Footer = dynamic(() => import("../components/Footer"), { ssr: false });
const NftShowcase = dynamic(() => import("../components/NftShowcase"), { ssr: false });
const RoadmapSlideshow = dynamic(() => import("../components/RoadmapSlideshow"), { ssr: false });
const LoadingScreen = dynamic(() => import("../components/LoadingScreen"), { ssr: false });
const OptimizedVideo = dynamic(() => import("../components/OptimizedVideo"), { ssr: false });

import { ASSET_MANIFEST } from "../config/assets";
import { usePerformanceMonitoring } from "../hooks/usePerformanceMonitoring";
import { scrollOptimizer } from "../utils/scrollOptimization";
import "../styles/lore-grid.css";
import "../styles/nft-showcase.css";
import "../styles/titlepage-hero.css";
import "../styles/roadmap-slideshow.css";
import "../styles/kanstar-token-section.css";
import "../styles/wormhole.css";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const navRef = useRef<HTMLElement>(null);
  const heroesRef = useRef<HTMLElement>(null);
  const heroesTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasCompletedInitialLoad = useRef(false);

  // Add video refs and hover handlers
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleMouseEnter = useCallback((index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
    }
  }, []);

  const handleMouseLeave = useCallback((index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.play().catch(err => {
        console.warn('Video playback failed:', err);
      });
    }
  }, []);

  // Show loading screen immediately on mount
  useEffect(() => {
    setIsLoading(true);
    setContentVisible(false);
  }, []);

  const handleLoadComplete = useCallback(() => {
    if (hasCompletedInitialLoad.current) return;
    
    hasCompletedInitialLoad.current = true;
    
    // First ensure we're at the top without animation
    window.scrollTo(0, 0);
    
    // Set content to visible but opacity 0
    setContentVisible(true);
    
    // Small delay to ensure smooth transition
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, []);

  // Initialize performance monitoring
  usePerformanceMonitoring({
    onPerformanceIssue: (metric, value) => {
      console.warn(`Performance issue detected - ${metric}: ${value}`);
    }
  });

  // Initialize scroll optimization
  useEffect(() => {
    scrollOptimizer.configure({
      debounceDelay: 100,
      throttleDelay: 16,
      disableOnLowFPS: true,
      fpsThreshold: 45
    });
    scrollOptimizer.startOptimizing();

    return () => {
      scrollOptimizer.stopOptimizing();
    };
  }, []);

  // Initialize GSAP
  useEffect(() => {
    if (!isLoading && contentVisible) {
      initializeAnimations();
    }
  }, [isLoading, contentVisible]);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  // Cleanup function for videos
  const cleanupVideos = useCallback(() => {
    videoRefs.current.forEach(video => {
      if (video) {
        video.pause();
        video.src = '';
        video.load();
      }
    });
    videoRefs.current = [];
  }, []);

  useEffect(() => {
    return () => {
      cleanupVideos();
    };
  }, [cleanupVideos]);

  // Initialize GSAP animations
  const initializeAnimations = () => {
    if (!containerRef.current) return;
    
    // Clear any existing ScrollTriggers
    ScrollTrigger.getAll().forEach(st => st.kill());
    
    // Create a single context for better performance
    const ctx = gsap.context(() => {
      // Batch ScrollTrigger registrations
      ScrollTrigger.batch(".animate-on-scroll", {
        onEnter: batch => gsap.to(batch, {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          overwrite: true
        }),
        once: true
      });

      // Navbar animation
      const navTimeline = gsap.timeline();
      navTimeline.fromTo(navRef.current,
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
      scrollOptimizer.optimizeTimeline(navTimeline);

      // Create animations for each section
      sectionsRef.current.forEach((section, index) => {
        if (index === 0) {
          // First Section - Landing Page
          const landingTimeline = gsap.timeline();
          landingTimeline.fromTo(section.querySelector('.content-container'),
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
          scrollOptimizer.optimizeTimeline(landingTimeline);
        } else if (index === 1) {
          // Second Section - Heroes Animation
          const heroesTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top center+=20%",
              end: "bottom center",
              scrub: false,
              once: false,
              onEnter: () => {
                gsap.to(section.querySelector('.heroes-container'), {
                  opacity: 1,
                  scale: 1,
                  filter: 'blur(0px)',
                  y: 0,
                  duration: 0.8,
                  ease: "power2.out",
                  onComplete: () => {
                    gsap.to(section.querySelector('.heroes-container'), {
                      scale: 1.05,
                      duration: 0.4,
                      ease: "power1.inOut",
                      yoyo: true,
                      repeat: 1
                    });
                  }
                });
              },
              onLeave: () => {
                gsap.to(section.querySelector('.heroes-container'), {
                  opacity: 0,
                  scale: 0.5,
                  filter: 'blur(15px)',
                  y: 50,
                  duration: 0.4,
                  ease: "power2.in"
                });
              },
              onEnterBack: () => {
                gsap.to(section.querySelector('.heroes-container'), {
                  opacity: 1,
                  scale: 1,
                  filter: 'blur(0px)',
                  y: 0,
                  duration: 0.8,
                  ease: "power2.out",
                  onComplete: () => {
                    gsap.to(section.querySelector('.heroes-container'), {
                      scale: 1.05,
                      duration: 0.4,
                      ease: "power1.inOut",
                      yoyo: true,
                      repeat: 1
                    });
                  }
                });
              },
              onLeaveBack: () => {
                gsap.to(section.querySelector('.heroes-container'), {
                  opacity: 0,
                  scale: 0.5,
                  filter: 'blur(15px)',
                  y: 50,
                  duration: 0.4,
                  ease: "power2.in"
                });
              }
            }
          });
          
          // Set initial state
          gsap.set(section.querySelector('.heroes-container'), {
            opacity: 0,
            scale: 0.5,
            filter: 'blur(15px)',
            y: 50,
            transformOrigin: "center center"
          });

          scrollOptimizer.optimizeTimeline(heroesTimeline);
          heroesTimelineRef.current = heroesTimeline;
        } else if (index === 2) {
          // Third Section - Lore Section
          // Story telling animation - One smooth continuous motion
          const storyTellingTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top center",
              toggleActions: "play none none none",
              scrub: false
            }
          });

          storyTellingTimeline
            .fromTo(".story-telling-container",
              {
                opacity: 0,
                scale: 0.8,
                y: 50,
                filter: 'blur(10px)'
              },
              {
                opacity: 1,
                scale: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 1.5,
                ease: "power3.out"
              }
            );

          // Optimize timeline
          scrollOptimizer.optimizeTimeline(storyTellingTimeline);
        } else if (index === 5) {
          // Sixth Section - NFT Showcase
          const nftTimeline = gsap.timeline({
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
          nftTimeline
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
          scrollOptimizer.optimizeTimeline(nftTimeline);
        } else if (index !== 3 && index !== 4) { // Skip pin behavior for roadmap (3) and token (4) sections
          // Use markers in development to debug scroll issues
          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "+=100%",
            pin: true,
            pinSpacing: true,
            markers: process.env.NODE_ENV === 'development',
            anticipatePin: 1, // Helps prevent jarring
            fastScrollEnd: true, // Better performance
            preventOverlaps: true, // Prevent multiple pins from conflicting
            onEnter: () => {
              // Smooth scroll to section
              section.scrollIntoView({ behavior: 'smooth' });
            }
          });
        }
      });

      // Heroes Animation
      if (heroesRef.current) {
        // Create the timeline but don't play it yet
        heroesTimelineRef.current = gsap.timeline({ paused: true });
        
        // Set initial state
        gsap.set(heroesRef.current.querySelector('.heroes-container'), {
          opacity: 0,
          scale: 0.5,
          filter: 'blur(15px)',
          y: 50,
          transformOrigin: "center center"
        });

        // Define the animation sequence
        heroesTimelineRef.current
          .to(heroesRef.current.querySelector('.heroes-container'), {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            y: 0,
            duration: 0.8,
            ease: "power2.out"
          })
          .to(heroesRef.current.querySelector('.heroes-container'), {
            scale: 1.05,
            duration: 0.4,
            ease: "power1.inOut",
            yoyo: true,
            repeat: 1
          });
      }
    }, containerRef);

    // Cleanup function
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  };

  // Add state for sidebar visibility
  const [showSidebar, setShowSidebar] = useState(true);
  const footerRef = useRef<HTMLElement>(null);

  // Add intersection observer for footer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hide sidebar when footer is visible, show when not visible
        setShowSidebar(!entry.isIntersecting);
      },
      {
        threshold: 0.1 // Trigger when 10% of footer is visible
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <LoadingScreen 
        onLoadComplete={handleLoadComplete}
        onError={() => setLoadingError(true)} 
      />
      
      {loadingError && !isLoading && (
        <div className="fixed inset-0 bg-black z-[1000] flex flex-col items-center justify-center">
          <h2 className="text-red-500 text-2xl mb-4">Failed to load resources</h2>
          <button 
            onClick={() => {
              setLoadingError(false);
              setIsLoading(true);
            }}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded"
          >
            Retry
          </button>
        </div>
      )}
      
      <div 
        ref={containerRef} 
        className={`relative bg-black transition-opacity duration-1000 ${
          contentVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Navbar ref={navRef} />

        {/* First Section - Landing Page */}
        <section ref={addToRefs} className="relative h-screen w-full pt-[80px]">
          <Image
            src={ASSET_MANIFEST.CRITICAL.BACKGROUND}
            alt="Cosmic Background"
            fill
            className="object-cover -scale-x-100 z-[1]"
            priority
          />
          
          {/* Title Overlay */}
          <div className="absolute inset-0 flex items-center z-[2]">
            <div className="content-container relative w-full bg-white/20 backdrop-blur-sm py-8 border-y border-white/10 overflow-visible">
              <div className="max-w-[1920px] mx-auto px-8 xl:px-6 lg:px-4 md:px-4 sm:px-2 relative">
                {/* Planet Container - Base size for large screens */}
                <div className="absolute left-[30%] top-[50%] -translate-x-1/2 -translate-y-1/2">
                  <div className="relative transition-all duration-300 ease-in-out planet-container">
                    <Image
                      src={ASSET_MANIFEST.VIDEOS.PLANET.fallback}
                      alt={ASSET_MANIFEST.VIDEOS.PLANET.alt}
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>

                {/* Title Content - Right aligned with responsive text */}
                <div className="title-content">
                  <h1>
                    KANSTAR<br />WORLD
                  </h1>
                  <p>
                    THE ULTIMATE COSMIC DOGGO
                  </p>
                </div>
              </div>

              {/* Collection Button - Responsive positioning and sizing */}
              <div className="absolute max-w-[1920px] w-full right-0 left-0 mx-auto px-8 xl:px-6 lg:px-4 md:px-4 sm:px-2">
                <div className="button-container">
                  <button>
                    CHECK COLLECTION
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Update sidebar with conditional rendering and transition */}
        <div 
          className={`fixed bottom-8 left-3 z-[999] flex flex-col gap-4 transition-all duration-300 ease-in-out ${
            showSidebar 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 -translate-x-full'
          }`}
        >
          <a 
            href="https://t.me/KanstarWorld" 
            target="_blank" 
            rel="noopener noreferrer"
            className="transition-transform hover:scale-110"
          >
            <Image
              src="/images/assets/social-icons/icon TG.png"
              alt="Telegram"
              width={30}
              height={30}
            />
          </a>
          <a 
            href="https://discord.gg/kanstarworld" 
            target="_blank" 
            rel="noopener noreferrer"
            className="transition-transform hover:scale-110"
          >
            <Image
              src="/images/assets/social-icons/icon DC.png"
              alt="Discord"
              width={30}
              height={30}
            />
          </a>
          <a 
            href="https://twitter.com/KanstarWorld" 
            target="_blank" 
            rel="noopener noreferrer"
            className="transition-transform hover:scale-110"
          >
            <Image
              src="/images/assets/social-icons/icon X.png"
              alt="X (Twitter)"
              width={30}
              height={30}
            />
          </a>
        </div>

        {/* Second Section - Heroes Animation */}
        <section 
          id="heroes" 
          ref={(el) => {
            addToRefs(el);
            if (el) heroesRef.current = el;
          }} 
          className="wormhole-section"
        >
          <Image
            src="/images/optimized/backgrounds/background_2.webp"
            alt="Cosmic Background"
            fill
            className="object-cover rotate-180"
            priority
          />
          
          <h2 className="wormhole-title title-glow">
            COSMIC GUARDIANS
          </h2>
          
          <div className="wormhole-container">
            <div className="wormhole-image">
              <Image
                src={ASSET_MANIFEST.IMAGES.WORMHOLE}
                alt="Wormhole Background"
                fill
                className="object-contain opacity-80"
                priority
              />
            </div>
          </div>
          
          {/* Heroes Container with animation class */}
          <div className="heroes-container absolute inset-0 flex items-center justify-center">
            <div className="relative w-[1300px] h-[600px] xl:w-[1400px] xl:h-[650px] sm:w-full sm:h-auto sm:max-w-[320px] lg:max-w-[800px] lg:max-h-[500px]">
              <Image
                src={ASSET_MANIFEST.IMAGES.HEROES}
                alt="Kanstar Heroes"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <p className="wormhole-subtitle subtitle-glow">
            Ancient Protectors of the Quantum Realm
          </p>
        </section>

        {/* Third Section - Lore Section */}
        <section id="lore" ref={addToRefs} className="relative h-screen w-full">
          <Image
            src={ASSET_MANIFEST.CRITICAL.BACKGROUND}
            alt="Cosmic Background"
            fill
            className="object-cover -scale-x-100"
            priority
          />
          <div className="absolute inset-0">
            <div className="relative w-full h-full">
              {/* Hero Text - Architect's Log */}
              <h1 className="lore-hero-text title-glow">Architect&apos;s Log</h1>
              
              {/* Story Telling Container - Left Side */}
              <div className="story-telling-container">
                <OptimizedVideo
                  webm={ASSET_MANIFEST.VIDEOS.LORE_STORYTELLING.webm}
                  mp4={ASSET_MANIFEST.VIDEOS.LORE_STORYTELLING.mp4}
                  fallbackImage={ASSET_MANIFEST.VIDEOS.LORE_STORYTELLING.fallback}
                  alt={ASSET_MANIFEST.VIDEOS.LORE_STORYTELLING.alt}
                  className="object-contain"
                />
                <h2 className="story-telling-title">The Epic Saga of the Kanstars</h2>
              </div>

              {/* Lore Grid Container - Right Side */}
              <div className="lore-grid-container">
                {[1, 2, 3, 4].map((num, index) => {
                  const videoKey = `LORE_${num}` as keyof typeof ASSET_MANIFEST.VIDEOS;
                  return (
                    <div 
                      key={num}
                      className="lore-grid-item"
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={() => handleMouseLeave(index)}
                    >
                      <OptimizedVideo
                        webm={ASSET_MANIFEST.VIDEOS[videoKey].webm}
                        mp4={ASSET_MANIFEST.VIDEOS[videoKey].mp4}
                        fallbackImage={ASSET_MANIFEST.VIDEOS[videoKey].fallback}
                        alt={ASSET_MANIFEST.VIDEOS[videoKey].alt}
                        className="w-full h-full object-cover"
                        unoptimized={ASSET_MANIFEST.VIDEOS[videoKey].fallback.endsWith('.gif')}
                        ref={(el: HTMLDivElement | null) => {
                          if (el) {
                            const videoEl = el.querySelector('video');
                            videoRefs.current[index] = videoEl;
                          }
                        }}
                      />
                      {/* Overlay for blur effect */}
                      <div className="lore-grid-overlay">
                        <div className="blur-mask"></div>
                      </div>
                      {/* Separate text layer */}
                      <div className="lore-text-layer">
                        <h3>
                          {num === 1 && "Origins of the Kanstar"}
                          {num === 2 && "The Great Discovery"}
                          {num === 3 && "Cosmic Guardians"}
                          {num === 4 && "Future of the Stars"}
                        </h3>
                        <p>
                          {num === 1 && "In the distant third cosmic string, the planet Kanstar was invaded by a ruthless alien force."}
                          {num === 2 && "Amid the devastation, the Architect, a guardian of ancient secrets, embarks on a quest to revive his lost race."}
                          {num === 3 && "His search leads him to the Canis Amber, a relic containing Primordial Cells essential for resurrection. Of the eighteen cells found, only sixteen remain viable."}
                          {num === 4 && "Using the Quantum Codex, he launches Project HOPE, placing the cells in Kanstar Capsules to resurrect 4,444 canine souls."}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Fourth Section - Roadmap */}
        <section id="roadmap" ref={addToRefs} className="relative h-screen w-full overflow-hidden">
          <Image
            src="/images/backgrounds/background_2.png"
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
        <section id="token" ref={addToRefs} className="token-section">
          <Image
            src="/images/backgrounds/background_2.png"
            alt="Cosmic Background"
            fill
            className="token-background"
            priority
          />
          {/* Top Debris */}
          <div className="token-debris top">
            <Image
              src={ASSET_MANIFEST.IMAGES.DEBRIS}
              alt="Space Debris Top"
              fill
              className="object-contain"
            />
          </div>
          <div className="token-content">
            {/* Token Purchase Container */}
            <div className="token-container">
              {/* Left Kanstar Container */}
              <div className="token-kanstar">
                <div className="token-kanstar-video">
                  <OptimizedVideo
                    webm={ASSET_MANIFEST.VIDEOS.TOKEN.webm}
                    mp4={ASSET_MANIFEST.VIDEOS.TOKEN.mp4}
                    fallbackImage={ASSET_MANIFEST.VIDEOS.TOKEN.fallback}
                    alt={ASSET_MANIFEST.VIDEOS.TOKEN.alt}
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Center Text */}
              <div className="token-center">
                <h2 className="token-title">
                  PURCHASE
                </h2>
                <div className="token-image">
                  <Image
                    src="/images/assets/$kanstar.PNG"
                    alt="$KANSTAR Token"
                    fill
                    className="object-contain"
                    priority
                    unoptimized={true}
                  />
                </div>
                <h2 className="token-title">
                  TOKEN
                </h2>
              </div>

              {/* Right Kanstar Container */}
              <div className="token-kanstar">
                <div className="token-kanstar-video flipped">
                  <OptimizedVideo
                    webm={ASSET_MANIFEST.VIDEOS.TOKEN.webm}
                    mp4={ASSET_MANIFEST.VIDEOS.TOKEN.mp4}
                    fallbackImage={ASSET_MANIFEST.VIDEOS.TOKEN.fallback}
                    alt={ASSET_MANIFEST.VIDEOS.TOKEN.alt}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Bottom Debris */}
          <div className="token-debris bottom">
            <Image
              src={ASSET_MANIFEST.IMAGES.DEBRIS}
              alt="Space Debris Bottom"
              fill
              className="object-contain"
            />
          </div>
        </section>

        {/* Sixth Section - NFT Showcase */}
        <section id="nft" ref={addToRefs} className="relative min-h-screen ">
          <Image
            src="/images/backgrounds/background_2.png"
            alt="Cosmic Background"
            fill
            className="object-cover -scale-y-100 -z-[1]"
            priority
          />
          <div className="relative z-[20]">
            <NftShowcase />
            <Footer ref={footerRef} unoptimized={true} />
          </div>
        </section>
      </div>
    </>
  );
}
