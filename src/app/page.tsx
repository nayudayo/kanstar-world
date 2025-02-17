"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NftShowcase from "../components/NftShowcase";
import OpeningCrawl from "../components/OpeningCrawl";
import Sidebar from "../components/Sidebar";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const navRef = useRef<HTMLElement>(null);

  // Roadmap section refs
  const roadmapRef = useRef<HTMLDivElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);
  const q1Ref = useRef<HTMLDivElement>(null);
  const q2Ref = useRef<HTMLDivElement>(null);
  const q3Ref = useRef<HTMLDivElement>(null);
  const q4Ref = useRef<HTMLDivElement>(null);
  const q1_2026Ref = useRef<HTMLDivElement>(null);
  const q2_2026Ref = useRef<HTMLDivElement>(null);
  const y2027Ref = useRef<HTMLDivElement>(null);
  const y2028Ref = useRef<HTMLDivElement>(null);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

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
          // First section - No scroll trigger, just a simple fade in
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
          // Second Section - Spaceship only
          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "+=200%",
            pin: true,
            pinSpacing: true,
            markers: false
          });

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=200%",
              scrub: 2,
              markers: false
            }
          });

          timeline
            .fromTo(".spaceship", {
              top: "-50%",
              right: "-50%",
              xPercent: 0,
              yPercent: 0,
              opacity: 1
            }, {
              top: "20%",
              left: "25%",
              xPercent: -50,
              yPercent: -50,
              duration: 0.1
            })
            .to(".spaceship", {
              top: "70%",
              left: "50%",
              xPercent: -50,
              yPercent: -50,
              duration: 0.1
            })
            .to(".spaceship", {
              top: "50%",
              left: "50%",
              xPercent: -50,
              yPercent: -50,
              duration: 0.1
            })
            .to(".spaceship", {
              top: "45%",
              duration: 0.2,
              repeat: 4,
              yoyo: true,
              ease: "power1.inOut"
            })
            .to(".spaceship", {
              top: "50%",
              duration: 0.1
            })
            // Add diagonal exit movement
            .to(".spaceship", {
              top: "120%",
              left: "-20%",
              xPercent: -50,
              yPercent: -50,
              duration: 0.3,
              ease: "power1.in"
            });
        } else if (index === 2) {
          // Third Section - Text Crawl - No scroll trigger, just the crawl animation
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
        } else if (index === 3) {
          // Fourth Section - Roadmap
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=200%",
              scrub: 1,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              markers: false
            }
          });

          // Set initial states
          gsap.set([
            q1Ref.current, q2Ref.current, q3Ref.current, q4Ref.current,
            q1_2026Ref.current, q2_2026Ref.current, y2027Ref.current, y2028Ref.current
          ], {
            opacity: 0,
            scale: 0.8,
            visibility: "visible"
          });

          // Set rocket's initial position
          gsap.set(rocketRef.current, {
            left: "-20%",    // Start from off-screen left
            bottom: "-70%",  // Start from way below the screen
            top: "auto",
            opacity: 1,
            visibility: "visible",
            scale: 1
          });

          // Create the animation sequence
          tl
            // Q1 2025 + Rocket segment 1
            .to(q1Ref.current, { opacity: 1, scale: 1, duration: 1, ease: "power2.out" })
            .to(rocketRef.current, { left: "25%", bottom: "-35%", duration: 1, ease: "none" }, "<")

            // Q2 2025 + Rocket segment 2
            .to(q2Ref.current, { opacity: 1, scale: 1, duration: 1 })
            .to(rocketRef.current, { left: "35%", bottom: "-25%", duration: 1 }, "<")

            // Q3 2025 + Rocket segment 3
            .to(q3Ref.current, { opacity: 1, scale: 1, duration: 1 })
            .to(rocketRef.current, { left: "45%", bottom: "-15%", duration: 1 }, "<")

            // Q4 2025 + Rocket segment 4
            .to(q4Ref.current, { opacity: 1, scale: 1, duration: 1 })
            .to(rocketRef.current, { left: "55%", bottom: "-5%", duration: 1 }, "<")

            // Q1 2026 + Rocket segment 5
            .to(q1_2026Ref.current, { opacity: 1, scale: 1, duration: 1 })
            .to(rocketRef.current, { left: "65%", bottom: "5%", duration: 1 }, "<")

            // Q2 2026 + Rocket segment 6
            .to(q2_2026Ref.current, { opacity: 1, scale: 1, duration: 1 })
            .to(rocketRef.current, { left: "75%", bottom: "15%", duration: 1 }, "<")

            // 2027 + Rocket segment 7
            .to(y2027Ref.current, { opacity: 1, scale: 1, duration: 1 })
            .to(rocketRef.current, { left: "85%", bottom: "25%", duration: 1 }, "<")

            // 2028 + Final rocket position with extra movement off screen
            .to(y2028Ref.current, { opacity: 1, scale: 1, duration: 1 })
            .to(rocketRef.current, { left: "95%", bottom: "35%", duration: 1 }, "<")
            // Add final movement off screen
            .to(rocketRef.current, { 
              left: "120%", 
              bottom: "120%", 
              scale: 0.5, 
              duration: 0.5,
              ease: "power1.in"
            });
        } else if (index === 4) {
          // Fifth Section - NFT Slideshow - Fade in on scroll
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
        } else {
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

      {/* First Section - Original */}
      <section ref={addToRefs} className="relative h-screen w-full pt-[80px]">
        <Image
          src="/images/backgrounds/cosmic-background.png"
          alt="Cosmic Background"
          fill
          className="object-cover -scale-x-100"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center content-container">
          <div className="relative w-[1200px] h-[1200px] absolute top-[90%] left-[32%] transform -translate-x-[50%] -translate-y-[50%]">
            <img
              src="/images/planet.gif"
              alt="Planet"
              className="w-full h-full object-contain"
              onError={(e) => {
                console.error('Error loading planet GIF:', e);
                // Optionally set a fallback image
                // e.currentTarget.src = '/images/fallback-planet.png';
              }}
            />
          </div>
        </div>
      </section>

      {/* Second Section - 180 degree rotation */}
      <section ref={addToRefs} className="relative h-screen w-full">
        <Image
          src="/images/backgrounds/cosmic-background.png"
          alt="Cosmic Background Rotated"
          fill
          className="object-cover rotate-180"
          priority
        />
        <div className="absolute inset-0">
          <div 
            className="spaceship absolute w-[400px] h-[400px]"
          >
            <Image
              src="/images/assets/ship/ship.png"
              alt="Spaceship"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      {/* Third Section - Text Crawl */}
      <section ref={addToRefs} className="relative h-screen w-full">
        <Image
          src="/images/backgrounds/cosmic-background.png"
          alt="Cosmic Background"
          fill
          className="object-cover -scale-x-100"
          priority
        />
        <div className="absolute inset-0 crawl-container">
          <OpeningCrawl />
        </div>
      </section>

      {/* Fourth Section - Roadmap */}
      <section ref={addToRefs} className="relative h-screen w-full overflow-hidden bg-black/20">
        {/* Background */}
        <Image
          src="/images/backgrounds/cosmic-background.png"
          alt="Cosmic Background Flipped"
          fill
          className="object-cover rotate-180"
          priority
        />
        
        {/* Roadmap Content Container */}
        <div ref={roadmapRef} className="absolute inset-0 w-full h-full">
          {/* Rocket */}
          <div ref={rocketRef} className="absolute w-[400px] h-[400px] transform -translate-x-1/2 -translate-y-1/2">
            <Image
              src="/images/roadmap/rocket.png"
              alt="Rocket"
              fill
              className="object-contain"
              style={{ transform: 'rotate(335deg)' }}
              priority
            />
          </div>

          {/* 2025 Q1 */}
          <div ref={q1Ref} className="absolute w-[400px] h-[400px] left-[20%] top-[70%] transform -translate-x-1/2 -translate-y-1/2">
            <Image
              src="/images/roadmap/q1-2025.png"
              alt="Q1 2025"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* 2025 Q2 */}
          <div ref={q2Ref} className="absolute w-[400px] h-[400px] left-[35%] top-[53%] transform -translate-x-1/2 -translate-y-1/2">
            <Image
              src="/images/roadmap/q2-2025.png"
              alt="Q2 2025"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* 2025 Q3 */}
          <div ref={q3Ref} className="absolute w-[400px] h-[400px] right-[23%] top-[90%] transform -translate-x-1/2 -translate-y-1/2">
            <Image
              src="/images/roadmap/q3-2025.png"
              alt="Q3 2025"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* 2025 Q4 */}
          <div ref={q4Ref} className="absolute w-[400px] h-[400px] right-[25%] top-[35%] transform -translate-x-1/2 -translate-y-1/2">
            <Image
              src="/images/roadmap/q4-2025.png"
              alt="Q4 2025"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* 2026 Q1 */}
          <div ref={q1_2026Ref} className="absolute w-[400px] h-[400px] left-[70%] top-[72%] transform -translate-x-1/2 -translate-y-1/2">
            <Image
              src="/images/roadmap/q1-2026.png"
              alt="Q1 2026"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* 2026 Q2 */}
          <div ref={q2_2026Ref} className="absolute w-[400px] h-[400px] left-[85%] top-[57%] transform -translate-x-1/2 -translate-y-1/2">
            <Image
              src="/images/roadmap/q2-2026.png"
              alt="Q2 2026"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* 2027 */}
          <div ref={y2027Ref} className="absolute w-[400px] h-[400px] left-[70%] top-[20%] transform -translate-x-1/2 -translate-y-1/2">
            <Image
              src="/images/roadmap/2027.png"
              alt="2027"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* 2028 */}
          <div ref={y2028Ref} className="absolute w-[400px] h-[400px] left-[95%] bottom-[40%] transform -translate-x-1/2 -translate-y-1/2">
            <Image
              src="/images/roadmap/2028.png"
              alt="2028"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      {/* Fifth Section - NFT Slideshow */}
      <section ref={addToRefs} className="relative min-h-screen">
        <div>
          <NftShowcase />
          <Footer />
        </div>
      </section>
    </div>
  );
}
