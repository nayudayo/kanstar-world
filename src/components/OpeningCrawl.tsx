import '@/styles/crawl.css';
import { useEffect, useRef, useState } from 'react';

// Separate content component for reuse
const CrawlContent = () => (
  <div className="crawl-content">
    <div className="title">
      <h1 className="text-glow-lg">KANSTAR</h1>
      <h2 className="text-glow">A New Digital Era</h2>
    </div>
    
    <div className="content">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
      <br /><br />
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <br /><br />
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
    </div>
  </div>
);

const OpeningCrawl = () => {
  const [copies, setCopies] = useState(4); // Start with more copies
  const crawlRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateCopies = () => {
      if (!crawlRef.current || !viewportRef.current) return;
      
      const viewportHeight = viewportRef.current.offsetHeight;
      const contentHeight = crawlRef.current.children[0].clientHeight;
      // Increase the multiplier to ensure more overlap
      const neededCopies = Math.ceil((viewportHeight * 5) / contentHeight) + 2;
      
      setCopies(Math.max(neededCopies, 4)); // Ensure minimum 4 copies
    };

    updateCopies();
    window.addEventListener('resize', updateCopies);
    return () => window.removeEventListener('resize', updateCopies);
  }, []);

  return (
    <div className="star-wars">
      <div className="viewport" ref={viewportRef}>
        <div className="crawl" ref={crawlRef}>
          {[...Array(copies)].map((_, i) => (
            <CrawlContent key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OpeningCrawl; 