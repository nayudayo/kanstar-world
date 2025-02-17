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
      <p>In the distant third cosmic string, the planet Kanstar was invaded by a ruthless alien force.</p>
      <div className="lore-gif-container">
        <img src="images/gif/lore/lore-1.gif" alt="Lore 1" className="lore-gif" />
      </div>
      
      <p>Amid the devastation, the Architect, a guardian of ancient secrets, embarks on a quest to revive his lost race.</p>
      <div className="lore-gif-container">
        <img src="images/gif/lore/lore-2.gif" alt="Lore 2" className="lore-gif" />
      </div>
      
      <p>His search leads him to the Canis Amber, a relic containing Primordial Cells essential for resurrection. Of the eighteen cells found, only sixteen remain viable.</p>
      <div className="lore-gif-container">
        <img src="images/gif/lore/lore-3.gif" alt="Lore 3" className="lore-gif" />
      </div>
      
      <p>Using the Quantum Codex, he launches Project HOPE, placing the cells in Kanstar Capsules to resurrect 4,444 canine souls.</p>
      <br /><br />
      
      <p>Thus begins the epic saga of the Kanstars</p>
      <div className="lore-gif-container">
        <img src="images/gif/lore/lore-4.gif" alt="Lore 4" className="lore-gif" />
      </div>
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