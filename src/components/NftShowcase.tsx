import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

const NftShowcase = () => {
  const [selectedNft, setSelectedNft] = useState<string | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const [images, setImages] = useState<number[]>(Array.from({ length: 12 }, (_, i) => i + 1));

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    const animateCards = () => {
      // Create new image order
      const newImages = [...images];
      const lastImage = newImages.pop()!;
      newImages.unshift(lastImage);
      setImages(newImages);

      // Animate all cards
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        
        const isLeftSide = i < 6;
        const relativeIndex = isLeftSide ? i : i - 6;
        
        if (relativeIndex === 0) {
          // New cards start at their respective sides
          gsap.fromTo(card,
            {
              [isLeftSide ? 'left' : 'right']: '-13px',
              scale: 1.2,
              opacity: 0,
              zIndex: isLeftSide ? 65 : 60
            },
            {
              [isLeftSide ? 'left' : 'right']: '-13px',
              scale: 0.9,
              opacity: 1,
              duration: 0.75,
              ease: "power2.inOut"
            }
          );
        } else {
          // Existing cards shift outward
          gsap.to(card, {
            [isLeftSide ? 'left' : 'right']: `${(relativeIndex) * 160 + 60}px`,
            scale: Math.max(0.6, 0.9 - ((relativeIndex + 1) * 0.06)),
            duration: 0.75,
            ease: "power2.inOut",
            zIndex: 60 - (relativeIndex * 10)
          });
        }
      });
    };

    if (isAutoPlaying) {
      interval = setInterval(animateCards, 1000);
    }

    return () => clearInterval(interval);
  }, [isAutoPlaying, images]);

  const handleCardClick = () => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    cardsRef.current[index] = el;
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <Image
        src="/images/backgrounds/cosmic-background.png"
        alt="Cosmic Background Flipped"
        fill
        className="object-cover -scale-x-100"
        priority
      />
      
      {/* Header Section */}
      <div className="absolute top-0 left-0 right-0 px-8 py-16">
        <div className="max-w-7xl mx-auto flex items-start justify-between">
          <h2 className="text-6xl font-bold text-white text-glow-lg mt-16">
            HUNDREDS OF UNIQUE<br />
            DIGITAL<br />
            COLLECTIBLES.
          </h2>
          <p className="text-lg text-gray-300 max-w-md text-glow-sm mt-16">
            Each KANSTAR NFT is a unique digital masterpiece, crafted from our collection of over 100 hand-painted cosmic elements. These ethereal beings embody our core values of innovation, community, and boundless creativity, making them not just collectibles, but gateways to an extraordinary digital universe.
          </p>
        </div>
      </div>
      
      {/* NFT Carousel Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          ref={sliderRef} 
          data-nft-container
          className="relative w-[2400px] h-[400px] flex items-center justify-center translate-y-20"
        >
          {/* Left Side */}
          <div className="relative h-[400px] flex items-center">
            {[...Array(6)].map((_, i) => {
              const xOffset = i === 0 ? -15: (i * 160 + 60);
              const scale = Math.max(0.6, 0.9 - (i * 0.06));
              const zIndex = i === 0 ? 65 : (60 - (i * 10));
              const imageIndex = i < images.length ? images[i] : 1;
              
              return (
                <div
                  key={`left-${i}`}
                  ref={(el) => setCardRef(el, i)}
                  className="absolute w-[280px] aspect-[3/4] rounded-[30px] overflow-hidden shadow-2xl cursor-pointer"
                  style={{
                    left: `${xOffset}px`,
                    transform: `translateX(0) scale(${scale})`,
                    opacity: 1,
                    zIndex,
                  }}
                  onClick={() => handleCardClick()}
                >
                  <Image
                    src={`/images/nft/nft${imageIndex}.png`}
                    alt={`NFT ${imageIndex}`}
                    fill
                    className="object-cover"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedNft(`/images/nft/nft${imageIndex}.png`);
                    }}
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                </div>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="relative h-[400px] flex items-center">
            {[...Array(6)].map((_, i) => {
              const xOffset = i === 0 ? -15: (i * 160 + 60);
              const scale = Math.max(0.6, 0.9 - (i * 0.06));
              const zIndex = i === 0 ? 60 : (60 - (i * 10));
              const imageIndex = i + 6 < images.length ? images[i + 6] : 1;
              
              return (
                <div
                  key={`right-${i}`}
                  ref={(el) => setCardRef(el, i + 6)}
                  className="absolute w-[280px] aspect-[3/4] rounded-[30px] overflow-hidden shadow-2xl cursor-pointer"
                  style={{
                    right: `${xOffset}px`,
                    transform: `translateX(0) scale(${scale})`,
                    opacity: 1,
                    zIndex,
                  }}
                  onClick={() => handleCardClick()}
                >
                  <Image
                    src={`/images/nft/nft${imageIndex}.png`}
                    alt={`NFT ${imageIndex}`}
                    fill
                    className="object-cover"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedNft(`/images/nft/nft${imageIndex}.png`);
                    }}
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Add extra padding space at the bottom */}
      <div className="h-[50vh]"></div>

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
};

export default NftShowcase; 