interface OptimizedVideoProps {
  webm: string;
  mp4: string;
  fallbackImage: string;
  className?: string;
  alt: string;
}

const OptimizedVideo = ({ webm, mp4, fallbackImage, className = "", alt }: OptimizedVideoProps) => {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full"
        style={{ objectFit: 'contain', width: '100%', height: '100%' }}
        poster={fallbackImage}
        aria-label={alt}
      >
        {/* WebM for Chrome, Firefox, Edge */}
        <source src={webm} type="video/webm" />
        {/* MP4 for Safari and fallback */}
        <source src={mp4} type="video/mp4" />
        {/* Fallback for browsers that don't support video */}
        <img
          src={fallbackImage}
          alt={alt}
          className="w-full h-full"
          style={{ objectFit: 'contain' }}
        />
      </video>
    </div>
  );
};

export default OptimizedVideo; 