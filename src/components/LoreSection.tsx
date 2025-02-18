import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LoreSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const loreImagesRef = useRef<(HTMLDivElement | null)[]>([]);

  const setLoreImageRef = (index: number) => (el: HTMLDivElement | null) => {
    loreImagesRef.current[index] = el;
  };

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
      }
    });

    // Animate each lore image
    loreImagesRef.current.forEach((ref, index) => {
      if (ref) {
        tl.fromTo(ref,
          {
            opacity: 0,
            y: 50
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out"
          },
          index * 0.3
        );
      }
    });
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-between px-20">
      {/* Left side - Story Telling GIF */}
      <div className="relative w-[600px] h-[600px]">
        <Image
          src="/images/gif/lore/story-telling.gif"
          alt="Story Telling"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Right side - Stacked Lore Images */}
      <div className="flex flex-col gap-8 w-[600px]">
        {[1, 2, 3].map((num, index) => (
          <div
            key={num}
            ref={setLoreImageRef(index)}
            className="relative w-full h-[200px] opacity-0"
          >
            <Image
              src={`/images/gif/lore/lore-${num}.gif`}
              alt={`Lore ${num}`}
              fill
              className="object-contain"
              priority
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoreSection; 