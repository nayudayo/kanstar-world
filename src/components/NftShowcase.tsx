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

      // Only animate the main card (index 0)
      const mainCard = cardsRef.current[0];
      if (mainCard) {
        gsap.fromTo(mainCard,
          {
            left: 'calc(50% - 175px)',
            transform: 'translateX(-50%) scale(0.84)',
            opacity: 0.5,
            zIndex: 55
          },
          {
            left: 'calc(50% - 13px)',
            transform: 'translateX(-50%) scale(0.9)',
            opacity: 1,
            duration: 0.75,
            ease: "power3.out",
            zIndex: 65
          }
        );
      }

      // Update right preview cards positions without animation
      [1, 2].forEach((i) => {
        const card = cardsRef.current[i];
        if (card) {
          gsap.set(card, {
            left: `calc(50% + ${160 + ((i - 1) * 160)}px)`,
            transform: `translateX(-50%) scale(${Math.max(0.6, 0.9 - ((i + 1) * 0.06))})`,
            zIndex: 60 - (i * 10)
          });
        }
      });
    };

    if (isAutoPlaying) {
      interval = setInterval(animateCards, 2000);
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
        className="object-cover -scale-x-100 -scale-y-100"
        priority
      />
      
      {/* Header Section */}
      <div className="absolute -top-0 left-0 right-0 px-8 py-16">
        <div className="max-w-7xl mx-auto flex items-start justify-between">
          <h2 className="text-6xl lg:text-7xl font-bold text-white text-glow-lg">
            4444: A CHARMINGLY<br />
            CRAFTED<br />
            COLLECTION.
          </h2>
          <p className="text-lg lg:text-xl text-gray-300 max-w-md lg:max-w-lg text-glow-sm">
          #1 Most Voted Community Collection on Ronin Kanstar is the ultimate cosmic good boy, a legendary fusion between a celestial being and a doggo a uniquely star-shaped backside. 
          </p>
        </div>

        {/* Rarity Description Container - Moved under header */}
        <div className="max-w-7xl mx-auto mt-16 lg:mt-20 flex justify-end ml-20 lg:ml-40 translate-x-40">
          <div className="relative w-[500px] h-[500px] lg:w-[600px] lg:h-[600px] scale-125 -translate-y-20 translate-x-20 lg:translate-x-10 -mt-10">
            {/* Background Image */}
            <Image
              src="/images/assets/rarity-desc.png"
              alt="Rarity Description Background"
              fill
              className="object-contain"
              priority
            />
            
            {/* Content Container */}
            <div className="absolute inset-0 flex flex-col justify-center p-10 lg:p-12 space-y-3 lg:space-y-4 -translate-y-0 translate-x-24 lg:translate-x-24">
              {/* Legendary */}
              <div className="space-y-0.5 lg:space-y-1">
                <h3 className="text-xl lg:text-2xl font-bold text-[#FFD700] tracking-wider rarity-title-glow">Legendary</h3>
                <p className="text-white/90 text-sm lg:text-base tracking-wide">Furs: Diamond, Future, Cosmic</p>
              </div>

              {/* Epic */}
              <div className="space-y-0.5 lg:space-y-1">
                <h3 className="text-xl lg:text-2xl font-bold text-[#A335EE] tracking-wider rarity-title-glow">Epic</h3>
                <p className="text-white/90 text-sm lg:text-base tracking-wide">Furs: Fire, Snowy, Ocean, Golden</p>
              </div>

              {/* Rare */}
              <div className="space-y-0.5 lg:space-y-1">
                <h3 className="text-xl lg:text-2xl font-bold text-[#0070DD] tracking-wider rarity-title-glow">Rare</h3>
                <p className="text-white/90 text-sm lg:text-base tracking-wide">Furs: Plushie, Gummy, Undead</p>
              </div>

              {/* Uncommon */}
              <div className="space-y-0.5 lg:space-y-1">
                <h3 className="text-xl lg:text-2xl font-bold text-[#1EFF00] tracking-wider rarity-title-glow">Uncommon</h3>
                <p className="text-white/90 text-sm lg:text-base tracking-wide">Furs: Dalmatta, Fluffy, Pinky</p>
              </div>

              {/* Common */}
              <div className="space-y-0.5 lg:space-y-1">
                <h3 className="text-xl lg:text-2xl font-bold text-[#FFFFFF] tracking-wider rarity-title-glow">Common</h3>
                <p className="text-white/90 text-sm lg:text-base tracking-wide">Furs: Bluey, Blacky, Yellow</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* NFT Carousel Container */}
      <div className="absolute inset-0 flex items-center">
        <div 
          ref={sliderRef}
          data-nft-slider
          className="relative w-[800px] lg:w-[1000px] h-[400px] lg:h-[500px] flex items-center justify-center translate-y-20 ml-20 lg:ml-32"
        >
          {/* Single Sequence of Cards */}
          <div className="relative h-[400px] lg:h-[500px] flex items-center justify-center mt-[100px] lg:mt-[120px]">
            {/* Preview Cards - Left Side */}
            {[1, 0].map((offset) => {
              const xOffset = -175 - (offset * 160);
              const scale = Math.max(0.6, 0.9 - ((offset + 1) * 0.06));
              const zIndex = 55 - (offset * 10);
              const imageIndex = images[images.length - 1 - offset] || images[0];
              
              return (
                <div
                  key={`preview-left-${offset}`}
                  className="absolute w-[280px] lg:w-[320px] aspect-[3/4] rounded-[30px] overflow-hidden shadow-2xl cursor-pointer"
                  style={{
                    left: `calc(50% + ${xOffset}px)`,
                    transform: `translateX(-50%) scale(${scale})`,
                    opacity: 0.5,
                    zIndex,
                  }}
                  onClick={() => handleCardClick()}
                >
                  <Image
                    src={`/images/nft/nft${imageIndex}.png`}
                    alt={`Preview NFT ${offset + 1}`}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                </div>
              );
            })}

            {/* Main Card */}
            <div
              key="card-main"
              ref={(el) => setCardRef(el, 0)}
              className="absolute w-[280px] lg:w-[320px] aspect-[3/4] rounded-[30px] overflow-hidden shadow-2xl cursor-pointer"
              style={{
                left: 'calc(50% - 13px)',
                transform: `translateX(-50%) scale(0.9)`,
                opacity: 1,
                zIndex: 65,
              }}
              onClick={() => handleCardClick()}
            >
              <Image
                src={`/images/nft/nft${images[0]}.png`}
                alt="Current NFT"
                fill
                className="object-cover"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedNft(`/images/nft/nft${images[0]}.png`);
                }}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
            </div>

            {/* Preview Cards - Right Side */}
            {[0, 1].map((offset) => {
              const xOffset = 160 + (offset * 160);
              const scale = Math.max(0.6, 0.9 - ((offset + 1) * 0.06));
              const zIndex = 55 - (offset * 10);
              const imageIndex = images[offset + 1] || images[0];
              
              return (
                <div
                  key={`preview-right-${offset}`}
                  ref={(el) => setCardRef(el, offset + 1)}
                  className="absolute w-[280px] lg:w-[320px] aspect-[3/4] rounded-[30px] overflow-hidden shadow-2xl cursor-pointer"
                  style={{
                    left: `calc(50% + ${xOffset}px)`,
                    transform: `translateX(-50%) scale(${scale})`,
                    opacity: 0.5,
                    zIndex,
                  }}
                  onClick={() => handleCardClick()}
                >
                  <Image
                    src={`/images/nft/nft${imageIndex}.png`}
                    alt={`Next NFT ${offset + 1}`}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Remove the old rarity container from here */}
        <div className="flex-1"></div>
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

      {/* Add styles for rarity titles */}
      <style jsx>{`
        .rarity-title-glow {
          text-shadow: 0 0 10px currentColor,
                      0 0 20px currentColor,
                      0 0 30px currentColor;
        }
      `}</style>
    </div>
  );
};

export default NftShowcase; 