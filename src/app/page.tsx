"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
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

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const navRef = useRef<HTMLElement>(null);

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
          const heroesTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top center",
              toggleActions: "play none none none",
              markers: false
            }
          });

          // Heroes animation sequence - One smooth motion
          heroesTimeline
            .fromTo(section.querySelector('.heroes-container'), 
              {
                opacity: 0,
                scale: 0.5,
                filter: 'blur(15px)',
                y: 50,
                transformOrigin: "center center"
              }, 
              {
                opacity: 1,
                scale: 1,
                filter: 'blur(0px)',
                y: 0,
                duration: 1.5,
                ease: "power3.out"
              }
            )
            .to(section.querySelector('.heroes-container'), {
              scale: 1.02,
              duration: 1,
              ease: "power1.inOut",
              yoyo: true,
              repeat: 1
            });

          scrollOptimizer.optimizeTimeline(heroesTimeline);
        } else if (index === 2) {
          // Third Section - Lore Section with individual animations
          const lorePin = ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "+=300%",
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            markers: true,
            onEnter: () => {
              console.log("Lore section entered");
              lorePin.refresh();
            }
          });

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

          // Single timeline for all lore items in sequence
          const loreTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=300%",
              scrub: 1,
              snap: {
                snapTo: "labels",
                duration: { min: 0.2, max: 0.4 },
                ease: "power1.inOut"
              }
            }
          });

          // First Lore Item
          loreTimeline
            .fromTo(".lore-section-1 .lore-item-group",
              {
                yPercent: 150,
                opacity: 0,
                scale: 0.8
              },
              {
                yPercent: -50,
                opacity: 1,
                scale: 1,
                duration: 0.4
              }
            )
            .fromTo(".lore-section-1 .lore-text-frame",
              {
                opacity: 0,
                x: 50
              },
              {
                opacity: 1,
                x: 0,
                duration: 0.3
              },
              "-=0.2"
            )
            .addLabel("lore1-stay")
            .to(".lore-section-1 .lore-item-group", {
              yPercent: -100,
              opacity: 0,
              scale: 0.8,
              duration: 0.4
            }, "+=0.5")
            .to(".lore-section-1 .lore-text-frame", {
              opacity: 0,
              x: -50,
              duration: 0.3
            }, "<")
            .addLabel("lore1-end")

            // Second Lore Item
            .fromTo(".lore-section-2 .lore-item-group",
              {
                yPercent: 150,
                opacity: 0,
                scale: 0.8
              },
              {
                yPercent: -50,
                opacity: 1,
                scale: 1,
                duration: 0.4
              }
            )
            .fromTo(".lore-section-2 .lore-text-frame",
              {
                opacity: 0,
                x: 50
              },
              {
                opacity: 1,
                x: 0,
                duration: 0.3
              },
              "-=0.2"
            )
            .addLabel("lore2-stay")
            .to(".lore-section-2 .lore-item-group", {
              yPercent: -100,
              opacity: 0,
              scale: 0.8,
              duration: 0.4
            }, "+=0.5")
            .to(".lore-section-2 .lore-text-frame", {
              opacity: 0,
              x: -50,
              duration: 0.3
            }, "<")
            .addLabel("lore2-end")

            // Third Lore Item
            .fromTo(".lore-section-3 .lore-item-group",
              {
                yPercent: 150,
                opacity: 0,
                scale: 0.8
              },
              {
                yPercent: -50,
                opacity: 1,
                scale: 1,
                duration: 0.4
              }
            )
            .fromTo(".lore-section-3 .lore-text-frame",
              {
                opacity: 0,
                x: 50
              },
              {
                opacity: 1,
                x: 0,
                duration: 0.3
              },
              "-=0.2"
            )
            .addLabel("lore3-stay");

          // Optimize timelines
          [storyTellingTimeline, loreTimeline].forEach(timeline => {
            scrollOptimizer.optimizeTimeline(timeline);
          });
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
            <div className="content-container relative w-full bg-white/20 backdrop-blur-sm py-8 md:py-12 border-y border-white/10 overflow-visible">
              <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
                {/* Planet Container - Positioned absolutely relative to the content container */}
                <div className="absolute left-[20%] top-[50%] -translate-x-1/2 -translate-y-1/2">
                  <div className="relative w-[600px] md:w-[800px] lg:w-[1000px] h-[600px] md:h-[800px] lg:h-[1000px]">
                    <Image
                      src={ASSET_MANIFEST.VIDEOS.PLANET.fallback}
                      alt={ASSET_MANIFEST.VIDEOS.PLANET.alt}
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>

                {/* Title Content */}
                <div className="text-right relative z-10">
                  <h1 className="text-white text-5xl md:text-6xl lg:text-8xl font-bold tracking-[0.2em] title-glow">
                    KANSTAR<br />WORLD
                  </h1>
                  <p className="text-[#FFD700] text-lg md:text-xl lg:text-2xl mt-4 md:mt-6 tracking-[0.3em] subtitle-glow">
                    THE ULTIMATE COSMIC DOGGO
                  </p>
                </div>
              </div>

              {/* Collection Button - Aligned with subtitle text */}
              <div className="absolute max-w-7xl w-full right-0 left-0 mx-auto px-4 md:px-8">
                <div className="flex justify-end">
                  <button className="px-8 md:px-12 py-2 md:py-3 backdrop-blur-md bg-black/30 text-white hover:bg-black/40 transition-all duration-300 tracking-[0.2em] font-medium border-[2px] border-white collection-button-glow text-base md:text-lg z-[3] translate-y-16 md:translate-y-24">
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
              <div className="story-telling-container absolute left-[25%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] flex items-center justify-center z-20">
                <OptimizedVideo
                  webm={ASSET_MANIFEST.VIDEOS.LORE_STORYTELLING.webm}
                  mp4={ASSET_MANIFEST.VIDEOS.LORE_STORYTELLING.mp4}
                  fallbackImage={ASSET_MANIFEST.VIDEOS.LORE_STORYTELLING.fallback}
                  alt={ASSET_MANIFEST.VIDEOS.LORE_STORYTELLING.alt}
                  className="object-contain"
                />
              </div>

              {/* Lore Items Container - Right Side */}
              <div className="relative w-[600px] h-[600px] ml-auto mr-[20%]">
                {[1, 2, 3].map((num) => {
                  const videoKey = `LORE_${num}` as keyof typeof ASSET_MANIFEST.VIDEOS;
                  return (
                    <div 
                      key={num}
                      className={`lore-section-${num} absolute w-full h-full`}
                    >
                      <div 
                        className="lore-item-group absolute w-full h-[400px]"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          zIndex: 10 - num,
                          transformStyle: 'preserve-3d',
                          opacity: 0
                        }}
                      >
                        <div className="lore-item relative w-full h-full">
                          <OptimizedVideo
                            webm={ASSET_MANIFEST.VIDEOS[videoKey].webm}
                            mp4={ASSET_MANIFEST.VIDEOS[videoKey].mp4}
                            fallbackImage={ASSET_MANIFEST.VIDEOS[videoKey].fallback}
                            alt={ASSET_MANIFEST.VIDEOS[videoKey].alt}
                            className="object-contain"
                          />
                        </div>
                        <div 
                          className="lore-text-frame absolute left-[90%] top-1/2 -translate-y-1/2 w-[300px] backdrop-blur-md bg-black/30 p-6 rounded-lg border border-white/10"
                          style={{ zIndex: 20, opacity: 0 }}
                        >
                          <h3 className="text-white text-2xl font-bold mb-4 tracking-wider text-glow-sm">Chapter {num}</h3>
                          <p className="text-white/90 text-lg leading-relaxed">
                            {num === 1 && "In the vast expanse of the cosmos, the Kanstar emerged as guardians of the celestial realms..."}
                            {num === 2 && "As their power grew, they discovered ancient artifacts that would shape their destiny..."}
                            {num === 3 && "United in purpose, the Kanstar now protect the balance of the cosmic forces..."}
                          </p>
                        </div>
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
              <div className="flex flex-col items-center gap-8 mx-10">
                <h2 className="text-white text-6xl font-bold tracking-[0.2em] title-glow text-center">
                  PURCHASE
                </h2>
                <div className="text-[#FFA500] text-7xl font-bold tracking-[0.2em] token-glow text-center">
                  $KANSTAR
                </div>
                <h2 className="text-white text-6xl font-bold tracking-[0.2em] title-glow text-center">
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
            filter: drop-shadow(0 0 30px rgba(0, 255, 255, 0.3))
                    drop-shadow(0 0 60px rgba(0, 255, 255, 0.2));
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
