import { VideoData } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatViews } from '@/utils/formatting';

interface VideoListProps {
  videos: VideoData[];
}

export const VideoList = ({ videos }: VideoListProps) => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">
          Video List
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-h-[600px] overflow-y-auto pr-4">
          <ul className="space-y-4">
            {videos.map((video, index) => (
              <li
                key={index}
                className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <span className="font-bold text-lg text-blue-600 min-w-[24px]">
                  {index + 1}.
                </span>
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-32 h-auto rounded-lg shadow-md"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{video.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {formatViews(video.views)} views
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};