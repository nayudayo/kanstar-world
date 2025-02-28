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
    <div className="roadmap-section">
      {/* Content Container */}
      <div className="roadmap-content">
        {/* Left side - Slideshow Container */}
        <div className="roadmap-left">
          {/* Hero Text */}
          <h2 className="roadmap-title">
            ROADMAP
          </h2>

          <div className="roadmap-slideshow">
            {/* Previous Slide Preview */}
            <div 
              className="preview-slide"
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
                className="current-slide"
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
              className="preview-slide"
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

          {/* Navigation Dots - Removed any flex or spacing classes */}
          <div className="roadmap-nav">
            {ROADMAP_IMAGES.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`nav-dot ${index === currentSlide ? 'active' : ''}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right side - Ship Image */}
        <div className="roadmap-right">
          <div className="ship-container">
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
  );
};

export default RoadmapSlideshow; 