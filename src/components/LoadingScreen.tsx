import { useEffect, useState } from 'react';
import { ASSET_MANIFEST } from '../config/assets';

// Loading tips to show during asset loading
const LOADING_TIPS = [
  "Preparing your cosmic journey...",
  "Summoning the Kanstar heroes...",
  "Initializing stellar coordinates...",
  "Charging quantum engines...",
  "Synchronizing universal frequencies..."
];

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

const LoadingScreen = ({ onLoadComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentTip, setCurrentTip] = useState(0);
  const [loadedAssets, setLoadedAssets] = useState(new Set<string>());
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Preload single asset
  const preloadAsset = async (src: string): Promise<void> => {
    if (loadedAssets.has(src)) return Promise.resolve();
    
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        setLoadedAssets(prev => new Set(prev).add(src));
        resolve();
      };
      img.onerror = (error) => {
        console.error(`Failed to load asset: ${src}`, error);
        reject(error);
      };
    });
  };

  // Load all assets
  useEffect(() => {
    const allAssets = [
      ...Object.values(ASSET_MANIFEST.CRITICAL),
      ...Object.values(ASSET_MANIFEST.IMAGES)
    ];
    const totalAssets = allAssets.length;
    let loadedCount = 0;

    const loadAssets = async () => {
      try {
        // First load critical assets
        await Promise.all(
          Object.values(ASSET_MANIFEST.CRITICAL).map(src => preloadAsset(src))
        );
        loadedCount += Object.keys(ASSET_MANIFEST.CRITICAL).length;
        setProgress((loadedCount / totalAssets) * 100);

        // Then load remaining assets
        await Promise.all(
          Object.values(ASSET_MANIFEST.IMAGES).map(async (src) => {
            await preloadAsset(src);
            loadedCount++;
            setProgress((loadedCount / totalAssets) * 100);
          })
        );

        // Ensure all assets are loaded before proceeding
        if (loadedCount === totalAssets) {
          // Start fade out animation
          setIsFadingOut(true);
          // Call onLoadComplete after fade out animation
          setTimeout(onLoadComplete, 1000);
        }
      } catch (error) {
        console.error('Error loading assets:', error);
        // Implement retry logic here
        // For now, we'll proceed anyway after a delay
        setIsFadingOut(true);
        setTimeout(onLoadComplete, 2000);
      }
    };

    loadAssets();

    // Rotate tips every 3 seconds
    const tipInterval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % LOADING_TIPS.length);
    }, 3000);

    return () => clearInterval(tipInterval);
  }, [onLoadComplete]);

  return (
    <div className={`fixed inset-0 bg-black z-[1000] flex flex-col items-center justify-center transition-opacity duration-1000 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
      {/* Logo/Branding */}
      <div className="mb-12">
        <h1 className="text-white text-6xl font-bold tracking-[0.2em] text-center loading-title-glow">
          KANSTAR<br />WORLD
        </h1>
      </div>

      {/* Loading Bar Container */}
      <div className="w-[400px] relative">
        {/* Progress Text */}
        <div className="absolute -top-6 left-0 right-0 text-center">
          <span className="text-[#00ffff] text-sm tracking-[0.2em]">
            {Math.round(progress)}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="h-[2px] w-full bg-white/20 overflow-hidden loading-bar-container">
          <div 
            className="h-full bg-[#00ffff] loading-bar-fill"
            style={{ 
              width: `${progress}%`,
              transition: 'width 0.3s ease-out'
            }}
          />
        </div>

        {/* Loading Tip */}
        <div className="absolute -bottom-8 left-0 right-0 text-center">
          <p className="text-white/70 text-sm tracking-wider loading-tip">
            {LOADING_TIPS[currentTip]}
          </p>
        </div>
      </div>

      <style jsx>{`
        .loading-title-glow {
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.8),
                      0 0 40px rgba(255, 255, 255, 0.6),
                      0 0 60px rgba(255, 255, 255, 0.4),
                      0 0 80px rgba(255, 255, 255, 0.2);
          animation: pulse 2s ease-in-out infinite;
        }

        .loading-bar-container {
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
        }

        .loading-bar-fill {
          box-shadow: 0 0 10px #00ffff,
                     0 0 20px #00ffff,
                     0 0 30px #00ffff;
        }

        .loading-tip {
          animation: fadeInOut 3s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes fadeInOut {
          0%, 100% {
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen; 