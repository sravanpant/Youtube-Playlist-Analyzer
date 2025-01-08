import { VideoData, Analytics, PerformanceMetric } from "@/types";

export const calculateAnalytics = (videos: VideoData[]): Analytics => {
  const totalViews = videos.reduce((sum, video) => sum + video.views, 0);
  const averageViews = Math.round(totalViews / videos.length);
  const maxViews = Math.max(...videos.map((video) => video.views));
  const minViews = Math.min(...videos.map((video) => video.views));

  // Sort videos by views for top performers
  const topVideos = [...videos].sort((a, b) => b.views - a.views).slice(0, 5);

  // Create views distribution
  const viewRanges = [
    { min: 0, max: 1000, name: "0-1K" },
    { min: 1000, max: 10000, name: "1K-10K" },
    { min: 10000, max: 100000, name: "10K-100K" },
    { min: 100000, max: 1000000, name: "100K-1M" },
    { min: 1000000, max: Infinity, name: "1M+" },
  ];

  const viewsDistribution = viewRanges.map((range) => ({
    name: range.name,
    value: videos.filter(
      (video) => video.views >= range.min && video.views < range.max
    ).length,
  }));

  const performanceMetrics = calculatePerformanceMetrics(videos);

  return {
    totalViews,
    averageViews,
    maxViews,
    minViews,
    topVideos,
    viewsDistribution,
    performanceMetrics,
  };
};

const calculatePerformanceMetrics = (
  videos: VideoData[]
): PerformanceMetric[] => {
  const totalViews = videos.reduce((sum, video) => sum + video.views, 0);
  const averageViews = Math.round(totalViews / videos.length);
  //   const maxViews = Math.max(...videos.map(video => video.views));
  const medianViews = calculateMedian(videos.map((video) => video.views));

  return [
    {
      category: "views",
      metric: "Average Views",
      value: averageViews,
      previousValue: averageViews * 0.9,
      description: "Average views per video",
      trend: "up",
    },
    {
      category: "views",
      metric: "Median Views",
      value: medianViews,
      previousValue: medianViews * 0.95,
      description: "Middle value of all video views",
      trend: "up",
    },
    {
      category: "engagement",
      metric: "Engagement Rate",
      value: calculateEngagementRate(videos),
      previousValue: 3.2,
      description: "Average engagement rate",
      trend: "down",
    },
    {
      category: "growth",
      metric: "Growth Rate",
      value: calculateGrowthRate(videos),
      previousValue: 12,
      description: "View growth rate over time",
      trend: "up",
    },
  ];
};

const calculateMedian = (numbers: number[]): number => {
  const sorted = numbers.slice().sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[middle - 1] + sorted[middle]) / 2
    : sorted[middle];
};

const calculateEngagementRate = (videos: VideoData[]): number => {
  const totalViews = videos.reduce((sum, video) => sum + video.views, 0);
  return (totalViews / videos.length / 1000) * 100;
};

const calculateGrowthRate = (videos: VideoData[]): number => {
  const sortedVideos = [...videos].sort(
    (a, b) =>
      new Date(b.publishDate || "").getTime() -
      new Date(a.publishDate || "").getTime()
  );
  const recentViews = sortedVideos
    .slice(0, Math.floor(sortedVideos.length / 2))
    .reduce((sum, video) => sum + video.views, 0);
  const olderViews = sortedVideos
    .slice(Math.floor(sortedVideos.length / 2))
    .reduce((sum, video) => sum + video.views, 0);
  return ((recentViews - olderViews) / olderViews) * 100;
};
