import { forwardRef, useRef, useEffect } from 'react';

interface OptimizedVideoProps {
  webm: string;
  mp4: string;
  fallbackImage: string;
  alt: string;
  className?: string;
}

const OptimizedVideo = forwardRef<HTMLDivElement, OptimizedVideoProps>(({
  webm,
  mp4,
  fallbackImage,
  alt,
  className = ''
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Forward the ref to parent if needed
    if (ref && typeof ref === 'function') {
      ref(containerRef.current);
    } else if (ref) {
      ref.current = containerRef.current;
    }

    // Auto-play the video when mounted
    const video = containerRef.current?.querySelector('video');
    if (video) {
      video.play().catch(err => {
        console.warn('Initial video playback failed:', err);
      });
    }
  }, [ref]);

  return (
    <div ref={containerRef} className={className}>
      <video
        autoPlay
        muted
        playsInline
        loop
        className="w-full h-full"
      >
        <source src={webm} type="video/webm" />
        <source src={mp4} type="video/mp4" />
        <img src={fallbackImage} alt={alt} className="w-full h-full object-contain" />
      </video>
    </div>
  );
});

OptimizedVideo.displayName = 'OptimizedVideo';

export default OptimizedVideo; 