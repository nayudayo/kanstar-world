import { forwardRef, useRef, useEffect } from 'react';
import Image from 'next/image';

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
        <div className="w-full h-full relative">
          <Image
            src={fallbackImage}
            alt={alt}
            fill
            className="object-contain"
            priority={false}
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLUEwLi0tLTAtQFBGPzpQRT4tLS9gVkVMS0lTUjg/XXFhcWBGS1P/2wBDARUXFx4aHR4eHVBLLy9QUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFP/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
        </div>
      </video>
    </div>
  );
});

OptimizedVideo.displayName = 'OptimizedVideo';

export default OptimizedVideo; 