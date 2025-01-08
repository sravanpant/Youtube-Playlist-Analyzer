import { VideoData } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatViews } from '@/utils/formatting';

interface TopVideosProps {
  videos: VideoData[];
}

export const TopVideosCard = ({ videos }: TopVideosProps) => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Top Performing Videos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {videos.map((video, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="text-lg font-bold text-blue-600 min-w-[24px]">
                #{index + 1}
              </span>
              <div className="flex-1">
                <p className="font-medium truncate">{video.title}</p>
                <p className="text-sm text-gray-600">
                  {formatViews(video.views)} views
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
