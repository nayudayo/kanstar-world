import { useEffect, useState } from 'react';

const Sidebar = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      setIsVisible(scrollPosition < viewportHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed left-8 top-1/2 -translate-y-1/2 z-[100] transition-all duration-500 ${!isVisible ? 'opacity-0 -translate-x-full' : 'opacity-100 translate-x-0'}`}>
      {/* Blur backdrop with animated gradient border - similar to Navbar */}
      <div className="relative backdrop-blur-lg bg-black/20 rounded-2xl border border-white/10 overflow-hidden shadow-lg">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-gradient-x"></div>
        
        {/* Social Icons Container */}
        <div className="relative px-4 py-6 flex flex-col gap-8">
          {/* Discord Icon */}
          <a href="#" className="text-white/80 hover:text-white transition-all duration-300 group relative">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.37-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.343 1.225 1.963a.077.077 0 0 0 .084.026 19.963 19.963 0 0 0 6.002-2.98.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" fill="currentColor"/>
            </svg>
            {/* Discord Tooltip */}
            <div className="absolute left-full ml-2 px-3 py-1 bg-black/80 backdrop-blur-sm text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap border border-white/10 shadow-lg">
              Discord
              <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 border-8 border-transparent border-r-black/80"></div>
            </div>
          </a>

          {/* Telegram Icon */}
          <a href="#" className="text-white/80 hover:text-white transition-all duration-300 group relative">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.2647 2.42778C21.98 2.19091 21.6364 2.03567 21.2704 1.97858C20.9045 1.92149 20.5299 1.96469 20.1866 2.10357L2.26566 9.33892C1.88241 9.49641 1.55729 9.76711 1.33093 10.1164C1.10457 10.4657 0.987272 10.8777 0.993743 11.2974C1.00021 11.7171 1.13011 12.1248 1.36751 12.4665C1.60491 12.8082 1.93872 13.0686 2.32716 13.2139L5.73366 14.4019L7.93366 20.5499C7.97481 20.6589 8.03871 20.7595 8.12166 20.8459C8.19966 20.9285 8.29294 20.9953 8.39716 21.0419C8.51196 21.0926 8.63608 21.1189 8.76166 21.1199C8.88418 21.1208 9.00544 21.0961 9.11816 21.0469C9.23559 20.9955 9.34165 20.9232 9.43116 20.8339L12.3232 17.9419L15.9002 20.7939C16.2395 21.0651 16.6653 21.2135 17.1047 21.2157C17.5441 21.2178 17.9713 21.0735 18.3132 20.8059C18.6436 20.5352 18.8817 20.1702 18.9937 19.7599L22.8522 4.36777C22.9523 4.00817 22.9464 3.62861 22.8352 3.27233C22.724 2.91605 22.5121 2.59772 22.2647 2.42778ZM6.77166 13.7539L2.89366 12.3939L16.9327 6.71392L6.77166 13.7539ZM8.76166 19.6199L7.04166 14.8339L17.2027 7.79392L8.76166 19.6199ZM17.5667 19.6199C17.5618 19.6504 17.549 19.679 17.5294 19.7032C17.5099 19.7274 17.4842 19.7464 17.4547 19.7589C17.4272 19.7697 17.3972 19.7733 17.3678 19.7694C17.3384 19.7655 17.3108 19.7543 17.2882 19.7369L9.24166 13.3539L21.2667 4.36777L17.5667 19.6199Z" fill="currentColor"/>
            </svg>
            {/* Telegram Tooltip */}
            <div className="absolute left-full ml-2 px-3 py-1 bg-black/80 backdrop-blur-sm text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap border border-white/10 shadow-lg">
              Telegram
              <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 border-8 border-transparent border-r-black/80"></div>
            </div>
          </a>

          {/* X (Twitter) Icon */}
          <a href="#" className="text-white/80 hover:text-white transition-all duration-300 group relative">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor"/>
            </svg>
            {/* X (Twitter) Tooltip */}
            <div className="absolute left-full ml-2 px-3 py-1 bg-black/80 backdrop-blur-sm text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap border border-white/10 shadow-lg">
              X (Twitter)
              <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 border-8 border-transparent border-r-black/80"></div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 