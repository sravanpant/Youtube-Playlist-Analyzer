export interface VideoData {
    title: string;
    views: number;
    thumbnail: string;
    category?: string;
    duration?: number;
    publishDate?: string;
  }
  
  export interface GraphData {
    name: string;
    views: number;
  }
  
  export interface Analytics {
    totalViews: number;
    averageViews: number;
    maxViews: number;
    minViews: number;
    topVideos: VideoData[];
    viewsDistribution: ViewDistribution[];
    performanceMetrics: PerformanceMetric[];
  }
  
  export interface ViewDistribution {
    name: string;
    value: number;
  }
  
  export interface PerformanceMetric {
    metric: string;
    value: number;
    description: string;
    trend: 'up' | 'down' | 'neutral';
    category: 'views' | 'engagement' | 'growth';
    previousValue?: number;
  }