import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import '../styles/nft-showcase.css';

const NftShowcase = () => {
  const [selectedNft, setSelectedNft] = useState<string | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const [images, setImages] = useState<number[]>(Array.from({ length: 12 }, (_, i) => i + 1));

  // Rarity data for marquee
  const rarityData = {
    legendary: {
      title: 'Legendary',
      furs: ['Diamond', 'Future', 'Cosmic'],
      color: '#FFD700'
    },
    epic: {
      title: 'Epic',
      furs: ['Fire', 'Snowy', 'Ocean', 'Golden'],
      color: '#A335EE'
    },
    rare: {
      title: 'Rare',
      furs: ['Plushie', 'Gummy', 'Undead'],
      color: '#0070DD'
    },
    uncommon: {
      title: 'Uncommon',
      furs: ['Dalmatta', 'Fluffy', 'Pinky'],
      color: '#1EFF00'
    },
    common: {
      title: 'Common',
      furs: ['Bluey', 'Blacky', 'Yellow'],
      color: '#FFFFFF'
    }
  };

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

  const RarityMarquee = ({ rarity, title, furs, color }: { rarity: string; title: string; furs: string[]; color: string }) => (
    <div className={`rarity-marquee ${rarity}`}>
      {/* Duplicate items for seamless loop */}
      {[...Array(3)].map((_, i) => (
        <div key={`${rarity}-${i}`} className="rarity-marquee-item" style={{ color }}>
          <strong>{title}:</strong>&nbsp;{furs.join(', ')}
        </div>
      ))}
    </div>
  );

  return (
    <div className="nft-showcase">
      <Image
        src="/images/backgrounds/cosmic-background.png"
        alt="Cosmic Background Flipped"
        fill
        className="object-cover -scale-x-100 -scale-y-100"
        priority
      />
      
      {/* Header Section */}
      <div className="nft-header">
        <div className="nft-header-content">
          <h2 className="nft-title">
            4444: A CHARMINGLY<br />
            CRAFTED<br />
            COLLECTION.
          </h2>
          <p className="nft-description">
            #1 Most Voted Community Collection on Ronin Kanstar is the ultimate cosmic good boy, a legendary fusion between a celestial being and a doggo a uniquely star-shaped backside. 
          </p>
        </div>

        {/* Desktop Rarity Container */}
        <div className="rarity-container">
          <div className="rarity-image-container">
            <Image
              src="/images/assets/rarity-desc.png"
              alt="Rarity Description Background"
              fill
              className="object-contain"
              priority
            />
            
            {/* Content Container */}
            <div className="rarity-content">
              {/* Legendary */}
              <div className="rarity-level">
                <h3 className="rarity-level-title rarity-legendary rarity-title-glow">Legendary</h3>
                <p className="rarity-level-description">Furs: Diamond, Future, Cosmic</p>
              </div>

              {/* Epic */}
              <div className="rarity-level">
                <h3 className="rarity-level-title rarity-epic rarity-title-glow">Epic</h3>
                <p className="rarity-level-description">Furs: Fire, Snowy, Ocean, Golden</p>
              </div>

              {/* Rare */}
              <div className="rarity-level">
                <h3 className="rarity-level-title rarity-rare rarity-title-glow">Rare</h3>
                <p className="rarity-level-description">Furs: Plushie, Gummy, Undead</p>
              </div>

              {/* Uncommon */}
              <div className="rarity-level">
                <h3 className="rarity-level-title rarity-uncommon rarity-title-glow">Uncommon</h3>
                <p className="rarity-level-description">Furs: Dalmatta, Fluffy, Pinky</p>
              </div>

              {/* Common */}
              <div className="rarity-level">
                <h3 className="rarity-level-title rarity-common rarity-title-glow">Common</h3>
                <p className="rarity-level-description">Furs: Bluey, Blacky, Yellow</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Rarity Marquee Section */}
        <div className="rarity-marquee-section">
          {Object.entries(rarityData).map(([rarity, data]) => (
            <RarityMarquee
              key={rarity}
              rarity={rarity}
              title={data.title}
              furs={data.furs}
              color={data.color}
            />
          ))}
        </div>
      </div>
      
      {/* NFT Carousel Container */}
      <div className="nft-carousel">
        <div 
          ref={sliderRef}
          data-nft-slider
          className="nft-slider"
        >
          {/* Single Sequence of Cards */}
          <div className="nft-cards-container">
            {/* Preview Cards - Left Side */}
            {[1, 0].map((offset) => {
              const xOffset = -175 - (offset * 160);
              const scale = Math.max(0.6, 0.9 - ((offset + 1) * 0.06));
              const zIndex = 55 - (offset * 10);
              const imageIndex = images[images.length - 1 - offset] || images[0];
              
              return (
                <div
                  key={`preview-left-${offset}`}
                  className="nft-card"
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
                  <div className="nft-card-overlay" />
                </div>
              );
            })}

            {/* Main Card */}
            <div
              key="card-main"
              ref={(el) => setCardRef(el, 0)}
              className="nft-card"
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
              <div className="nft-card-overlay" />
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
                  className="nft-card"
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
                  <div className="nft-card-overlay" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* NFT Dialog */}
      {selectedNft && (
        <div 
          className="nft-dialog"
          onClick={() => setSelectedNft(null)}
        >
          <div className="nft-dialog-content">
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