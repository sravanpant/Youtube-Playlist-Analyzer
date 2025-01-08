"use client";

import { useState } from "react";
import { VideoData, GraphData, Analytics } from "@/types";
import { PlaylistForm } from "@/components/playlist/PlaylistForm";
import { VideoList } from "@/components/playlist/VideoList";
import { ChartTabs } from "@/components/common/ChartsTab";
import { KeyMetricsCard } from "@/components/analytics/KeyMetricsCard";
import { TopVideosCard } from "@/components/analytics/TopVideosCard";
import { ViewsDistributionCard } from "@/components/analytics/ViewDistributionCard";
import { PerformanceMetricsCard } from "@/components/analytics/PerformanceMetricsCard";
import { calculateAnalytics } from "@/utils/analytics";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";

export default function Home() {
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [videoData, setVideoData] = useState<VideoData[]>([]);
  const [graphData, setGraphData] = useState<GraphData[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Validate URL
      if (!playlistUrl.includes("youtube.com/playlist")) {
        throw new Error("Please enter a valid YouTube playlist URL");
      }

      const response = await fetch("/api/scrape-playlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ playlistUrl }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch playlist data: ${response.statusText}`
        );
      }

      const data = await response.json();

      if (!data.videoList || data.videoList.length === 0) {
        throw new Error("No videos found in this playlist");
      }

      setVideoData(data.videoList);
      setGraphData(data.graphData);
      setAnalytics(calculateAnalytics(data.videoList));
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4 space-y-8">
        {/* Header Section */}
        <PlaylistForm
          playlistUrl={playlistUrl}
          setPlaylistUrl={setPlaylistUrl}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <span className="ml-2 text-lg text-gray-600">
              Analyzing playlist...
            </span>
          </div>
        )}

        {/* Results Section */}
        {videoData.length > 0 && !isLoading && (
          <>
            {/* Charts and Video List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <VideoList videos={videoData} />
              <ChartTabs graphData={graphData} />
            </div>

            {/* Analytics Section */}
            {analytics && (
              <div className="space-y-8">
                {/* Key Metrics Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <KeyMetricsCard
                    totalViews={analytics.totalViews}
                    averageViews={analytics.averageViews}
                    maxViews={analytics.maxViews}
                  />
                  <div className="md:col-span-2">
                    <TopVideosCard videos={analytics.topVideos} />
                  </div>
                </div>

                {/* Performance Metrics Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <ViewsDistributionCard
                    distribution={analytics.viewsDistribution}
                  />
                  <div className="md:col-span-2">
                    <PerformanceMetricsCard
                      metrics={analytics.performanceMetrics}
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!isLoading && !error && videoData.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Playlist Data
              </h3>
              <p className="text-gray-500">
                Enter a YouTube playlist URL above to start analyzing your
                videos.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
