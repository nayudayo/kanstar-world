import { useEffect, useCallback } from 'react';
import { performanceMonitor, PERFORMANCE_BUDGETS } from '../utils/performance';

interface UsePerformanceMonitoringProps {
  enabled?: boolean;
  onPerformanceIssue?: (metric: string, value: number) => void;
}

export const usePerformanceMonitoring = ({
  enabled = true,
  onPerformanceIssue
}: UsePerformanceMonitoringProps = {}) => {
  const checkPerformance = useCallback(() => {
    const fps = performanceMonitor.getAverageMetric('FPS');
    const memory = performanceMonitor.getAverageMetric('MemoryUsage');
    const frameTime = performanceMonitor.getAverageMetric('FrameTime');

    if (fps < PERFORMANCE_BUDGETS.FPS_MIN) {
      onPerformanceIssue?.('FPS', fps);
    }

    if (memory > PERFORMANCE_BUDGETS.MEMORY_MAX) {
      onPerformanceIssue?.('Memory', memory);
    }

    if (frameTime > PERFORMANCE_BUDGETS.FRAME_TIME_MAX) {
      onPerformanceIssue?.('Frame Time', frameTime);
    }
  }, [onPerformanceIssue]);

  useEffect(() => {
    if (!enabled) return;

    // Start monitoring
    performanceMonitor.startMonitoring();

    // Check performance every 5 seconds
    const interval = setInterval(checkPerformance, 5000);

    return () => {
      clearInterval(interval);
      performanceMonitor.stopMonitoring();
    };
  }, [enabled, checkPerformance]);

  return {
    getMetrics: performanceMonitor.getMetrics.bind(performanceMonitor),
    getAverageMetric: performanceMonitor.getAverageMetric.bind(performanceMonitor),
    clearMetrics: performanceMonitor.clearMetrics.bind(performanceMonitor)
  };
}; 