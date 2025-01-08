// components/playlist/PlaylistForm.tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PlaylistFormProps {
  playlistUrl: string;
  setPlaylistUrl: (url: string) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
}

export const PlaylistForm = ({
  playlistUrl,
  setPlaylistUrl,
  onSubmit,
  isLoading,
}: PlaylistFormProps) => {
  return (
    <Card className="shadow-lg border-t-4 border-t-blue-500">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-gray-800">
          YouTube Playlist Analyzer
        </CardTitle>
        <CardDescription className="text-lg text-gray-600">
          Analyze view counts and trends from any YouTube playlist
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="flex gap-4">
            <Input
              type="url"
              placeholder="Enter YouTube playlist URL"
              value={playlistUrl}
              onChange={(e) => setPlaylistUrl(e.target.value)}
              required
              className="flex-1 h-12 text-lg"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              {isLoading ? "Analyzing..." : "Analyze Playlist"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};