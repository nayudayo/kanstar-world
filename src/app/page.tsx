"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [selectedNft, setSelectedNft] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const navRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

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

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Navbar initial animation
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

      // Navbar scroll animation
      gsap.to(navRef.current, {
        scrollTrigger: {
          trigger: sectionsRef.current[1], // Blueprint section
          start: "top center",
          end: "center center",
          scrub: true,
          onUpdate: (self) => {
            if (self.direction > 0) {
              gsap.to(navRef.current, {
                opacity: 0,
                y: -50,
                duration: 0.3
              });
            } else if (self.direction < 0) {
              gsap.to(navRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.3
              });
            }
          }
        }
      });

      // Create animations for each section
      sectionsRef.current.forEach((section, index) => {
        if (index === 1) {
          // Second Section - Spaceship and Artwork
          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "+=200%",
            pin: true,
            pinSpacing: true,
            markers: true
          });

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=200%",
              scrub: 2,
              markers: true
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
              top: "50%",
              left: "50%",
              xPercent: -50,
              yPercent: -50,
              opacity: 1,
              duration: 0.2
            })
            .to(".spaceship", {
              opacity: 0,
              scale: 0.8,
              duration: 0.1
            })
            .fromTo(".artwork-overlay", {
              opacity: 0,
              scale: 0.8,
            }, {
              opacity: 1,
              scale: 1,
              duration: 0.7
            });
        } else if (index === 2) {
          // Third Section - Roadmap
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=200%",
              scrub: 1,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              markers: true
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

            // 2028 + Final rocket position
            .to(y2028Ref.current, { opacity: 1, scale: 1, duration: 1 })
            .to(rocketRef.current, { left: "95%", bottom: "35%", duration: 1 }, "<");
        } else {
          // Default pin behavior for other sections
          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "+=200%",
            pin: true,
            pinSpacing: true,
            markers: true
          });
        }
      });

      // Infinite slider animation
      const slider = sliderRef.current;
      if (slider) {
        gsap.to(slider.children, {
          xPercent: -100 * (slider.children.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: slider,
            start: "top center",
            end: "+=3000",
            scrub: 1,
            pin: true,
            markers: true,
            onUpdate: (self) => {
              if (self.progress === 1) {
                gsap.set(slider, { x: 0 });
              }
            }
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div ref={containerRef} className="relative bg-black">
      <Navbar ref={navRef} />

      {/* First Section - Original */}
      <section ref={addToRefs} className="relative h-screen w-full">
        <Image
          src="/images/backgrounds/cosmic-background.png"
          alt="Cosmic Background"
          fill
          className="object-cover -scale-x-100"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[700px] h-[700px]">
            <Image
              src="/images/Primordial Cell.gif"
              alt="Primordial Cell"
              fill
              className="object-contain"
              priority
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
          <div 
            className="artwork-overlay absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
          >
            <Image
              src="/images/Untitled_Artwork.png"
              alt="Artwork Overlay"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      {/* Third Section - Roadmap */}
      <section ref={addToRefs} className="relative h-screen w-full overflow-hidden bg-black/20">
        {/* Background */}
        <Image
          src="/images/backgrounds/cosmic-background.png"
          alt="Cosmic Background Flipped"
          fill
          className="object-cover -scale-x-100"
          priority
        />
        
        {/* Roadmap Content Container */}
        <div ref={roadmapRef} className="absolute inset-0 w-full h-full">
          {/* Debug Container */}
          <div className="absolute top-4 left-4 z-50 bg-black/50 text-white text-xs p-2">
            Debug: Roadmap Section
          </div>

          {/* Rocket */}
          <div ref={rocketRef} className="absolute w-[400px] h-[400px] transform -translate-x-1/2 -translate-y-1/2 border border-red-500/50">
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
          <div ref={q1Ref} className="absolute w-[400px] h-[400px] left-[20%] top-[70%] transform -translate-x-1/2 -translate-y-1/2 border border-blue-500/50">
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

      {/* Fourth Section - 180 degree rotation */}
      <section ref={addToRefs} className="relative h-screen w-full">
        <Image
          src="/images/backgrounds/cosmic-background.png"
          alt="Cosmic Background Rotated"
          fill
          className="object-cover rotate-180"
          priority
        />
      </section>

      {/* Fifth Section - Horizontal flip */}
      <section ref={addToRefs} className="relative h-screen w-full">
        <Image
          src="/images/backgrounds/cosmic-background.png"
          alt="Cosmic Background Flipped"
          fill
          className="object-cover -scale-x-100"
          priority
        />
      </section>

      <Footer />

      {/* NFT Dialog */}
      {selectedNft && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-8"
          onClick={() => setSelectedNft(null)}
        >
          <div className="relative w-full max-w-3xl aspect-[3/4]">
            <Image
              src={selectedNft}
              alt="Selected NFT"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
