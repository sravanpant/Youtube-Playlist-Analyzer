// KeyMetricsCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatViews } from "@/utils/formatting";

interface KeyMetricsProps {
  totalViews: number;
  averageViews: number;
  maxViews: number;
}

export const KeyMetricsCard = ({
  totalViews,
  averageViews,
  maxViews,
}: KeyMetricsProps) => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Key Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Views</p>
            <p className="text-2xl font-bold text-blue-600">
              {formatViews(totalViews)}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Average Views</p>
            <p className="text-2xl font-bold text-green-600">
              {formatViews(averageViews)}
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Most Viewed</p>
            <p className="text-2xl font-bold text-yellow-600">
              {formatViews(maxViews)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
