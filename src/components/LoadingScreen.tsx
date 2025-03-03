import { useEffect, useState, useCallback } from 'react';
import { ASSET_MANIFEST } from '../config/assets';

// Loading tips to show during asset loading
const LOADING_TIPS = [
  "Preparing your cosmic journey...",
  "Summoning the Kanstar heroes...",
  "Initializing stellar coordinates...",
  "Charging quantum engines...",
  "Synchronizing universal frequencies..."
];

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;
const MOBILE_BATCH_SIZE = 2;
const DESKTOP_BATCH_SIZE = 3;

interface LoadingScreenProps {
  onLoadComplete: () => void;
  onError?: () => void;
}

const LoadingScreen = ({ onLoadComplete, onError }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentTip, setCurrentTip] = useState(0);
  const [loadedAssets, setLoadedAssets] = useState(new Set<string>());
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [hasError, setHasError] = useState(false);

  // Check if device is mobile
  const isMobile = typeof window !== 'undefined' && 
    (window.innerWidth <= 768 || 'ontouchstart' in window);

  // Preload single asset with retry logic and timeout
  const preloadAsset = useCallback(async (src: string, attempt = 0): Promise<void> => {
    if (loadedAssets.has(src)) return Promise.resolve();
    
    try {
      await new Promise((resolve, reject) => {
        const img = new window.Image();
        
        const timeoutId = setTimeout(() => {
          img.src = "";
          reject(new Error(`Timeout loading asset: ${src}`));
        }, isMobile ? 15000 : 10000); // Longer timeout for mobile
        
        img.onload = () => {
          clearTimeout(timeoutId);
          setLoadedAssets(prev => new Set(prev).add(src));
          resolve(undefined);
        };
        
        img.onerror = (error) => {
          clearTimeout(timeoutId);
          reject(error);
        };
        
        img.src = src;
      });
    } catch (error) {
      if (attempt < MAX_RETRIES) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        return preloadAsset(src, attempt + 1);
      }
      throw error;
    }
  }, [loadedAssets, isMobile]);

  // Load assets progressively
  useEffect(() => {
    let mounted = true;
    let loadingTimeout: NodeJS.Timeout;
    
    const loadAssets = async () => {
      try {
        // First load critical assets
        const criticalAssets = Object.values(ASSET_MANIFEST.CRITICAL);
        const totalAssets = criticalAssets.length + Object.values(ASSET_MANIFEST.IMAGES).length;
        let loadedCount = 0;

        // Load critical assets first
        for (const src of criticalAssets) {
          if (!mounted) return;
          await preloadAsset(src);
          loadedCount++;
          setProgress((loadedCount / totalAssets) * 100);
        }

        // Then load remaining assets in batches
        const remainingAssets = Object.values(ASSET_MANIFEST.IMAGES);
        const BATCH_SIZE = isMobile ? MOBILE_BATCH_SIZE : DESKTOP_BATCH_SIZE;
        
        for (let i = 0; i < remainingAssets.length; i += BATCH_SIZE) {
          if (!mounted) return;
          const batch = remainingAssets.slice(i, i + BATCH_SIZE);
          await Promise.all(batch.map(async (src) => {
            await preloadAsset(src);
            loadedCount++;
            setProgress((loadedCount / totalAssets) * 100);
          }));

          // Add small delay between batches on mobile
          if (isMobile) {
            await new Promise(resolve => setTimeout(resolve, 100));
          }
        }

        // Ensure all assets are loaded before proceeding
        if (mounted && loadedCount === totalAssets) {
          setIsFadingOut(true);
          // Use requestAnimationFrame for smoother transition
          requestAnimationFrame(() => {
            setTimeout(onLoadComplete, 1000);
          });
        }
      } catch (error) {
        console.error('Error loading assets:', error);
        setHasError(true);
        if (onError) onError();
        
        if (retryCount < MAX_RETRIES) {
          setRetryCount(prev => prev + 1);
          loadingTimeout = setTimeout(loadAssets, RETRY_DELAY);
        } else {
          // If we've exhausted retries, try to proceed with critical assets only
          const loadedCritical = Object.values(ASSET_MANIFEST.CRITICAL)
            .every(src => loadedAssets.has(src));
          
          if (loadedCritical) {
            console.warn('Proceeding with critical assets only');
            setIsFadingOut(true);
            requestAnimationFrame(() => {
              setTimeout(onLoadComplete, 1000);
            });
          } else {
            // If critical assets failed, show error message
            console.error('Failed to load critical assets');
            if (onError) onError();
          }
        }
      }
    };

    loadAssets();

    // Rotate tips every 3 seconds
    const tipInterval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % LOADING_TIPS.length);
    }, 3000);

    return () => {
      mounted = false;
      clearInterval(tipInterval);
      clearTimeout(loadingTimeout);
    };
  }, [onLoadComplete, preloadAsset, retryCount, isMobile, onError]);

  return (
    <div 
      className={`fixed inset-0 bg-black z-[1000] flex flex-col items-center justify-center transition-opacity duration-1000 ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Logo/Branding */}
      <div className="mb-12">
        <h1 className="text-white text-4xl md:text-6xl font-bold tracking-[0.2em] text-center loading-title-glow">
          KANSTAR<br />WORLD
        </h1>
      </div>

      {/* Loading Bar Container */}
      <div className="w-[90%] max-w-[400px] relative">
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
          <p className="text-white/70 text-xs md:text-sm tracking-wider loading-tip">
            {hasError ? "Retrying..." : LOADING_TIPS[currentTip]}
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