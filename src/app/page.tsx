"use client";

import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NftShowcase from "../components/NftShowcase";
import RoadmapSlideshow from "../components/RoadmapSlideshow";
import Sidebar from "../components/Sidebar";
import LoadingScreen from "../components/LoadingScreen";
import OptimizedVideo from "../components/OptimizedVideo";
import { ASSET_MANIFEST } from "../config/assets";
import { usePerformanceMonitoring } from "../hooks/usePerformanceMonitoring";
import { scrollOptimizer } from "../utils/scrollOptimization";
import "../styles/lore-grid.css";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const navRef = useRef<HTMLElement>(null);
  const heroesRef = useRef<HTMLElement>(null);
  const heroesTimelineRef = useRef<gsap.core.Timeline | null>(null);

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

  const handleLoadComplete = () => {
    // Start fade out animation of loading screen
    setIsLoading(false);
    // Delay showing content until loading screen fades out
    setTimeout(() => {
      setContentVisible(true);
    }, 1000);
  };

  // Initialize all GSAP animations
  const initializeAnimations = () => {
    if (!containerRef.current) return;

    // Force scroll to top
    window.scrollTo(0, 0);
    
    // Clear any existing ScrollTriggers
    ScrollTrigger.getAll().forEach(st => st.kill());
    
    const ctx = gsap.context(() => {
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
          // Create the timeline but don't play it yet
          heroesTimelineRef.current = gsap.timeline({ paused: true });
          
          // Set initial state
          gsap.set(section.querySelector('.heroes-container'), {
            opacity: 0,
            scale: 0.5,
            filter: 'blur(15px)',
            y: 50,
            transformOrigin: "center center"
          });

          // Define the animation sequence
          heroesTimelineRef.current
            .to(section.querySelector('.heroes-container'), {
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
              y: 0,
              duration: 0.8,
              ease: "power2.out"
            })
            .to(section.querySelector('.heroes-container'), {
              scale: 1.05,
              duration: 0.4,
              ease: "power1.inOut",
              yoyo: true,
              repeat: 1
            });

          scrollOptimizer.optimizeTimeline(heroesTimelineRef.current);
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
  };

  // Handle Heroes section visibility
  useEffect(() => {
    if (!heroesRef.current || !heroesTimelineRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // When entering view, add a delay before playing
            setTimeout(() => {
              heroesTimelineRef.current?.play();
            }, 200); // 800ms delay
          } else {
            // When leaving view, reverse the animation
            if (entry.boundingClientRect.top > 0) {
              // Scrolling up
              gsap.to(entry.target.querySelector('.heroes-container'), {
                opacity: 0,
                scale: 0.5,
                filter: 'blur(15px)',
                y: 50,
                duration: 0.4,
                ease: "power2.in",
                onComplete: () => {
                  heroesTimelineRef.current?.pause(0);
                }
              });
            }
          }
        });
      },
      {
        threshold: 0.6, // Trigger when 60% visible instead of 30%
      }
    );

    observer.observe(heroesRef.current);

    return () => observer.disconnect();
  }, [contentVisible]);

  return (
    <>
      {isLoading && <LoadingScreen onLoadComplete={handleLoadComplete} />}
      <div 
        ref={containerRef} 
        className={`relative bg-black transition-opacity duration-1000 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <Navbar ref={navRef} />
        <Sidebar />

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
                  <div className={`
                    relative 
                    w-[1000px] h-[1000px]
                    2xl:w-[1000px] 2xl:h-[1000px]
                    xl:w-[800px] xl:h-[800px]
                    lg:w-[600px] lg:h-[600px]
                    md:w-[400px] md:h-[400px]
                    sm:w-[300px] sm:h-[300px]
                    transition-all duration-300 ease-in-out
                  `}>
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
                <div className={`
                  text-right relative z-10
                  ml-auto
                  w-[50%]
                  xl:w-[60%]
                  lg:w-[70%]
                  md:w-full md:text-center
                `}>
                  <h1 className={`
                    text-white font-bold tracking-[0.2em] title-glow
                    text-[8rem]
                    2xl:text-[8rem]
                    xl:text-[6rem]
                    lg:text-7xl
                    md:text-6xl
                    sm:text-4xl
                  `}>
                    KANSTAR<br />WORLD
                  </h1>
                  <p className={`
                    text-[#FFD700] tracking-[0.3em] subtitle-glow
                    text-2xl mt-6
                    xl:text-xl xl:mt-5
                    lg:text-lg lg:mt-4
                    md:text-base md:mt-3
                    sm:text-sm sm:mt-2
                  `}>
                    THE ULTIMATE COSMIC DOGGO
                  </p>
                </div>
              </div>

              {/* Collection Button - Responsive positioning and sizing */}
              <div className="absolute max-w-[1920px] w-full right-0 left-0 mx-auto px-8 xl:px-6 lg:px-4 md:px-4 sm:px-2">
                <div className={`
                  flex justify-end
                  ml-auto
                  w-[50%]
                  xl:w-[60%]
                  lg:w-[70%]
                  md:w-full md:justify-center
                `}>
                  <button className={`
                    backdrop-blur-md bg-black/30 text-white 
                    hover:bg-black/40 transition-all duration-300 
                    tracking-[0.2em] font-medium border-[2px] 
                    border-white collection-button-glow
                    px-12 py-3 text-lg translate-y-32
                    xl:px-10 xl:py-2.5 xl:text-base xl:translate-y-20
                    lg:px-8 lg:py-2 lg:translate-y-16
                    md:px-6 md:translate-y-12
                    sm:px-4 sm:text-sm sm:translate-y-8
                    relative z-10
                  `}>
                    CHECK COLLECTION
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Second Section - Heroes Animation */}
        <section 
          id="heroes" 
          ref={(el) => {
            addToRefs(el);
            if (el) heroesRef.current = el;
          }} 
          className="relative h-screen w-full overflow-hidden"
        >
          <Image
            src={ASSET_MANIFEST.CRITICAL.BACKGROUND}
            alt="Cosmic Background"
            fill
            className="object-cover rotate-180"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="heroes-container relative w-[1300px] h-[600px]">
              <Image
                src={ASSET_MANIFEST.IMAGES.HEROES}
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
            src={ASSET_MANIFEST.CRITICAL.BACKGROUND}
            alt="Cosmic Background"
            fill
            className="object-cover -scale-x-100"
            priority
          />
          <div className="absolute inset-0">
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Story Telling Container - Left Side */}
              <div className="story-telling-container absolute left-[25%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] min-w-[300px] min-h-[300px] flex items-center justify-center z-20 flex-col">
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
              <div className="relative w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] min-w-[300px] min-h-[300px] ml-auto mr-[10%] lg:mr-[20%] grid grid-cols-2 gap-8">
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
          {/* Top Debris */}
          <div className="absolute top-0 left-0 w-full h-[800px] -mt-[400px]">
            <Image
              src={ASSET_MANIFEST.IMAGES.DEBRIS}
              alt="Space Debris Top"
              fill
              className="object-contain"
            />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {/* Token Purchase Container */}
            <div className="flex items-center justify-between w-full max-w-[1920px] px-20">
              {/* Left Kanstar Container */}
              <div className="relative w-[800px] h-[800px] token-container">
                <div className="absolute inset-0">
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
              <div className="flex flex-col items-center gap-4 mx-10">
                <h2 className="text-white text-6xl font-bold tracking-[0.2em] title-glow text-center -mb-20">
                  PURCHASE
                </h2>
                <div className="relative w-[400px] h-[400px] my-2">
                  <Image
                    src="/images/assets/$kanstar.PNG"
                    alt="$KANSTAR Token"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <h2 className="text-white text-6xl font-bold tracking-[0.2em] title-glow text-center -mt-20">
                  TOKEN
                </h2>
              </div>

              {/* Right Kanstar Container */}
              <div className="relative w-[800px] h-[800px] token-container">
                <div className="absolute inset-0">
                  <OptimizedVideo
                    webm={ASSET_MANIFEST.VIDEOS.TOKEN.webm}
                    mp4={ASSET_MANIFEST.VIDEOS.TOKEN.mp4}
                    fallbackImage={ASSET_MANIFEST.VIDEOS.TOKEN.fallback}
                    alt={ASSET_MANIFEST.VIDEOS.TOKEN.alt}
                    className="object-contain -scale-x-100"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Bottom Debris */}
          <div className="absolute -bottom-[400px] left-0 w-full h-[800px] z-[100]">
            <Image
              src={ASSET_MANIFEST.IMAGES.DEBRIS}
              alt="Space Debris Bottom"
              fill
              className="object-contain rotate-180"
            />
          </div>
        </section>

        {/* Sixth Section - NFT Showcase */}
        <section id="nft" ref={addToRefs} className="relative min-h-screen ">
          <Image
            src="/images/backgrounds/cosmic-background.png"
            alt="Cosmic Background"
            fill
            className="object-cover -scale-y-100 -z-[1]"
            priority
          />
          <div className="relative z-[20]">
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
            filter: drop-shadow(0 0 15px rgba(0, 255, 255, 0.2));
            transition: filter 0.3s ease-out;
          }
          .token-container:hover {
            filter: drop-shadow(0 0 20px rgba(0, 255, 255, 0.3));
          }
          .collection-button-glow {
            box-shadow: 0 0 15px rgba(0, 255, 255, 0.5),
                       0 0 30px rgba(0, 255, 255, 0.3),
                       inset 0 0 15px rgba(0, 255, 255, 0.3);
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
          }
          .lore-scroll-container {
            transform-style: preserve-3d;
            perspective: 1000px;
            position: relative;
            height: 100%;
            width: 100%;
            overflow: visible;
          }
          .lore-item-group {
            transform-style: preserve-3d;
            will-change: transform, opacity;
            backface-visibility: hidden;
            perspective: 1000px;
          }
          .lore-item {
            transform-origin: center center;
            will-change: transform, opacity;
            backface-visibility: hidden;
            pointer-events: none;
            perspective: 1000px;
          }
          .lore-item video,
          .lore-item img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.2));
          }
          .lore-text-frame {
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.1),
                       inset 0 0 30px rgba(0, 255, 255, 0.05);
            transform-style: preserve-3d;
            will-change: transform, opacity;
            perspective: 1000px;
          }
          .text-glow-sm {
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.6),
                        0 0 20px rgba(255, 255, 255, 0.4);
          }
        `}</style>
      </div>
    </>
  );
}
