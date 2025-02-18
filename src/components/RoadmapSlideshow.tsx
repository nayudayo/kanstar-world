import { useState, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

const ROADMAP_IMAGES = [
  { src: '/images/roadmap/q1-2025.png', alt: 'Q1 2025' },
  { src: '/images/roadmap/q2-2025.png', alt: 'Q2 2025' },
  { src: '/images/roadmap/q3-2025.png', alt: 'Q3 2025' },
  { src: '/images/roadmap/q4-2025.png', alt: 'Q4 2025' },
  { src: '/images/roadmap/q1-2026.png', alt: 'Q1 2026' },
  { src: '/images/roadmap/q2-2026.png', alt: 'Q2 2026' },
  { src: '/images/roadmap/2027.png', alt: '2027' },
  { src: '/images/roadmap/2028.png', alt: '2028' }
];

const RoadmapSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const getPrevIndex = (current: number) => {
    return current === 0 ? ROADMAP_IMAGES.length - 1 : current - 1;
  };

  const getNextIndex = (current: number) => {
    return (current + 1) % ROADMAP_IMAGES.length;
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);

    // Animate out current slide
    gsap.to(`#slide-${currentSlide}`, {
      x: index < currentSlide ? "50%" : "-50%",
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      ease: "power2.inOut"
    });

    // Animate in new slide
    gsap.fromTo(`#slide-${index}`,
      {
        opacity: 0,
        scale: 0.8,
        x: index < currentSlide ? "-50%" : "50%",
      },
      {
        opacity: 1,
        scale: 1,
        x: "0%",
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => setIsAnimating(false)
      }
    );

    setCurrentSlide(index);
  };

  // Auto advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        const nextSlide = getNextIndex(currentSlide);
        goToSlide(nextSlide);
      }
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [currentSlide, isAnimating]);

  return (
    <div className="w-full h-full flex flex-col items-center">
      {/* Content Container - Full height for proper centering */}
      <div className="w-full h-full flex items-center justify-between px-20">
        {/* Left side - Slideshow Container */}
        <div className="flex flex-col items-center relative">
          {/* Hero Text - Centered above slideshow */}
          <h2 className="text-8xl font-bold text-white tracking-[0.2em] roadmap-title-glow absolute -top-28 left-1/2 -translate-x-1/2 whitespace-nowrap">
            ROADMAP
          </h2>

          <div className="relative w-[800px] h-[600px]">
            {/* Previous Slide Preview */}
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 w-[200px] h-[200px] cursor-pointer opacity-30 hover:opacity-50 transition-opacity"
              onClick={() => goToSlide(getPrevIndex(currentSlide))}
            >
              <Image
                src={ROADMAP_IMAGES[getPrevIndex(currentSlide)].src}
                alt="Previous"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Current Slides */}
            {ROADMAP_IMAGES.map((image, index) => (
              <div
                key={index}
                id={`slide-${index}`}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] transition-all duration-500"
                style={{ 
                  opacity: index === currentSlide ? 1 : 0,
                  pointerEvents: index === currentSlide ? 'auto' : 'none'
                }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            ))}

            {/* Next Slide Preview */}
            <div 
              className="absolute right-0 top-1/2 -translate-y-1/2 w-[200px] h-[200px] cursor-pointer opacity-30 hover:opacity-50 transition-opacity"
              onClick={() => goToSlide(getNextIndex(currentSlide))}
            >
              <Image
                src={ROADMAP_IMAGES[getNextIndex(currentSlide)].src}
                alt="Next"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Navigation Dots - Removed bottom margin */}
          <div className="flex gap-4">
            {ROADMAP_IMAGES.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-[#00ffff] scale-125 shadow-[0_0_10px_#00ffff]' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right side - Ship Image - Adjusted position and scale */}
        <div className="relative w-[800px] h-[600px]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[700px] h-[700px] ship-glow -translate-y-10">
              <Image
                src="/images/assets/ship/ship.png"
                alt="Kanstar Ship"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Add glow effect styles */}
      <style jsx>{`
        .roadmap-title-glow {
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.8),
                      0 0 40px rgba(255, 255, 255, 0.6),
                      0 0 60px rgba(255, 255, 255, 0.4),
                      0 0 80px rgba(255, 255, 255, 0.2);
        }

        .ship-glow {
          filter: drop-shadow(0 0 20px rgba(0, 255, 255, 0.3))
                  drop-shadow(0 0 40px rgba(0, 255, 255, 0.2));
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(-40px);
          }
          50% {
            transform: translateY(-60px);
          }
        }
      `}</style>
    </div>
  );
};

export default RoadmapSlideshow; 