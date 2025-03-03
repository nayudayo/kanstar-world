import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { performanceMonitor } from './performance';

gsap.registerPlugin(ScrollTrigger);

interface ScrollOptimizationOptions {
  debounceDelay?: number;
  throttleDelay?: number;
  disableOnLowFPS?: boolean;
  fpsThreshold?: number;
}

export class ScrollOptimizer {
  private static instance: ScrollOptimizer;
  private isOptimizing: boolean = false;
  private scrollTimeout: NodeJS.Timeout | null = null;
  private lastScrollTime: number = 0;
  private options: Required<ScrollOptimizationOptions>;
  private isScrolling: boolean = false;

  private constructor() {
    this.options = {
      debounceDelay: 250,
      throttleDelay: 32,
      disableOnLowFPS: true,
      fpsThreshold: 30
    };
  }

  static getInstance(): ScrollOptimizer {
    if (!ScrollOptimizer.instance) {
      ScrollOptimizer.instance = new ScrollOptimizer();
    }
    return ScrollOptimizer.instance;
  }

  configure(options: ScrollOptimizationOptions) {
    this.options = { ...this.options, ...options };
  }

  startOptimizing() {
    if (typeof window === 'undefined') return;
    
    if (this.isOptimizing) return;
    this.isOptimizing = true;

    // Add scroll event listener with throttling
    window.addEventListener('scroll', this.handleScroll, { passive: true });

    // Monitor scroll performance
    performanceMonitor.startMonitoring();
  }

  stopOptimizing() {
    if (typeof window === 'undefined') return;
    
    if (!this.isOptimizing) return;
    this.isOptimizing = false;

    window.removeEventListener('scroll', this.handleScroll);
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
  }

  private handleScroll = () => {
    if (typeof window === 'undefined') return;
    
    const now = performance.now();

    // Prevent rapid scroll events
    if (now - this.lastScrollTime < this.options.throttleDelay) {
      return;
    }
    this.lastScrollTime = now;

    // Set scrolling state
    if (!this.isScrolling) {
      this.isScrolling = true;
      document.body.classList.add('is-scrolling');
    }

    // Check FPS and disable animations if too low
    if (this.options.disableOnLowFPS) {
      const currentFPS = performanceMonitor.getAverageMetric('FPS');
      if (currentFPS < this.options.fpsThreshold) {
        this.optimizeForLowFPS();
      }
    }

    // Debounce scroll end with increased delay
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
    this.scrollTimeout = setTimeout(() => {
      this.onScrollEnd();
      this.isScrolling = false;
      document.body.classList.remove('is-scrolling');
    }, this.options.debounceDelay);

    // Update ScrollTrigger less frequently
    if (now % (this.options.throttleDelay * 2) === 0) {
      ScrollTrigger.update();
    }
  };

  private optimizeForLowFPS() {
    // Temporarily disable animations
    gsap.globalTimeline.timeScale(0.5);
    
    // Reduce ScrollTrigger update frequency
    ScrollTrigger.config({
      limitCallbacks: true,
      syncInterval: 50
    });

    // Disable smooth scrubbing
    ScrollTrigger.getAll().forEach(st => {
      if (st.vars.scrub) {
        st.vars.scrub = false;
      }
    });
  }

  private onScrollEnd() {
    // Reset optimizations
    gsap.globalTimeline.timeScale(1);
    
    // Reset ScrollTrigger config
    ScrollTrigger.config({
      limitCallbacks: false,
      syncInterval: 16.67 // 60fps
    });

    // Re-enable smooth scrubbing
    ScrollTrigger.getAll().forEach(st => {
      if (st.vars.scrub === false) {
        st.vars.scrub = true;
      }
    });

    // Force update
    ScrollTrigger.refresh();
  }

  // Optimize a specific GSAP timeline
  optimizeTimeline(timeline: gsap.core.Timeline) {
    timeline.eventCallback("onUpdate", () => {
      const fps = performanceMonitor.getAverageMetric('FPS');
      if (fps < this.options.fpsThreshold) {
        timeline.timeScale(0.5);
      } else {
        timeline.timeScale(1);
      }
    });
  }
}

// Export singleton instance
export const scrollOptimizer = ScrollOptimizer.getInstance(); 