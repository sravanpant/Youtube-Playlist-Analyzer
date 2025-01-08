import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PerformanceMetric } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, BarChart2, Activity, Info } from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { MetricCard } from "./MetricCard";

interface PerformanceMetricsProps {
  metrics: PerformanceMetric[];
}

export const PerformanceMetricsCard = ({
  metrics,
}: PerformanceMetricsProps) => {
  //   const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
  //     switch (trend) {
  //       case 'up':
  //         return <TrendingUp className="w-4 h-4 text-green-500" />;
  //       case 'down':
  //         return <TrendingDown className="w-4 h-4 text-red-500" />;
  //       default:
  //         return <Minus className="w-4 h-4 text-gray-500" />;
  //     }
  //   };

  //   const getPercentageChange = (current: number, previous: number) => {
  //     return ((current - previous) / previous * 100).toFixed(1);
  //   };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">
            Performance Metrics
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-5 h-5 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Detailed analysis of playlist performance</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="views" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="views">
              <Eye className="w-4 h-4 mr-2" />
              Views
            </TabsTrigger>
            <TabsTrigger value="engagement">
              <Activity className="w-4 h-4 mr-2" />
              Engagement
            </TabsTrigger>
            <TabsTrigger value="growth">
              <BarChart2 className="w-4 h-4 mr-2" />
              Growth
            </TabsTrigger>
          </TabsList>

          {["views", "engagement", "growth"].map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {metrics
                  .filter((metric) => metric.category === category)
                  .map((metric, index) => (
                    <MetricCard key={index} metric={metric} index={index} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};
