/**
 * Performance monitoring utility for tracking and analyzing performance metrics
 */

// Extend Performance interface to include memory
interface ExtendedPerformance extends Performance {
  memory?: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
}

// Performance metric types
type MetricName = 'FPS' | 'FrameTime' | 'MemoryUsage' | 'LoadTime' | 'AnimationDuration';

interface PerformanceMetric {
  name: MetricName;
  value: number;
  timestamp: number;
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceMetric[] = [];
  private frameCount: number = 0;
  private lastFrameTime: number = 0;
  private isMonitoring: boolean = false;
  private performance: ExtendedPerformance | null = null;

  private constructor() {
    // Only initialize performance if we're in the browser
    if (typeof window !== 'undefined') {
      this.performance = window.performance as ExtendedPerformance;
    }
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  // Start monitoring FPS and frame times
  startMonitoring() {
    // Only start monitoring if we're in the browser
    if (!this.performance || typeof window === 'undefined') return;
    
    if (this.isMonitoring) return;
    this.isMonitoring = true;
    this.lastFrameTime = this.performance.now();
    this.monitorFrame();
  }

  // Stop monitoring
  stopMonitoring() {
    this.isMonitoring = false;
  }

  // Monitor each frame
  private monitorFrame = () => {
    if (!this.isMonitoring || !this.performance) return;

    const currentTime = this.performance.now();
    const deltaTime = currentTime - this.lastFrameTime;
    this.frameCount++;

    // Calculate FPS every second
    if (deltaTime >= 1000) {
      const fps = (this.frameCount * 1000) / deltaTime;
      this.logMetric('FPS', fps);
      this.logMetric('FrameTime', deltaTime / this.frameCount);
      
      // Reset counters
      this.frameCount = 0;
      this.lastFrameTime = currentTime;
    }

    // Monitor memory usage if available
    if (this.performance.memory) {
      this.logMetric('MemoryUsage', this.performance.memory.usedJSHeapSize / 1048576); // Convert to MB
    }

    requestAnimationFrame(this.monitorFrame);
  };

  // Log a performance metric
  logMetric(name: MetricName, value: number) {
    this.metrics.push({
      name,
      value,
      timestamp: Date.now()
    });

    // Keep only last 1000 metrics
    if (this.metrics.length > 1000) {
      this.metrics.shift();
    }

    // Log if performance is below threshold
    if (name === 'FPS' && value < PERFORMANCE_BUDGETS.FPS_MIN) {
      console.warn(`Low FPS detected: ${value}`);
    }
  }

  // Get metrics for analysis
  getMetrics(name?: MetricName): PerformanceMetric[] {
    return name 
      ? this.metrics.filter(m => m.name === name)
      : this.metrics;
  }

  // Get average value for a metric
  getAverageMetric(name: MetricName): number {
    const relevantMetrics = this.metrics.filter(m => m.name === name);
    if (relevantMetrics.length === 0) return 0;

    const sum = relevantMetrics.reduce((acc, curr) => acc + curr.value, 0);
    return sum / relevantMetrics.length;
  }

  // Clear all metrics
  clearMetrics() {
    this.metrics = [];
  }
}

// Export singleton instance
export const performanceMonitor = PerformanceMonitor.getInstance();

// Performance budget thresholds
export const PERFORMANCE_BUDGETS = {
  FPS_MIN: 55,
  FRAME_TIME_MAX: 16.67, // ms (for 60fps)
  MEMORY_MAX: 100, // MB
  LOAD_TIME_MAX: 5000, // ms
  ANIMATION_DURATION_MAX: 300 // ms
}; 