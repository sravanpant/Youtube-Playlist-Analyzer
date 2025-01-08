// components/analytics/MetricCard.tsx
import { PerformanceMetric } from "@/types";
import { TrendingUp, TrendingDown, Minus, Info } from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { ResponsiveContainer, AreaChart, Area } from "recharts";
import { generateTrendData } from "@/utils/formatting";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface MetricCardProps {
  metric: PerformanceMetric;
  index: number;
}

export const MetricCard = ({ metric, index }: MetricCardProps) => {
  const getTrendIcon = (trend: "up" | "down" | "neutral") => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPercentageChange = (current: number, previous: number) => {
    return (((current - previous) / previous) * 100).toFixed(1);
  };

  const getTrendColor = (trend: "up" | "down" | "neutral") => {
    switch (trend) {
      case "up":
        return {
          text: "text-green-500",
          stroke: "#22c55e",
          gradient: ["#22c55e", "#bbf7d0"],
        };
      case "down":
        return {
          text: "text-red-500",
          stroke: "#ef4444",
          gradient: ["#ef4444", "#fecaca"],
        };
      default:
        return {
          text: "text-gray-500",
          stroke: "#6b7280",
          gradient: ["#6b7280", "#e5e7eb"],
        };
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-100 hover:border-blue-200 transition-all duration-200 hover:shadow-md">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-600">{metric.metric}</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="w-4 h-4 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm">{metric.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold">
            {typeof metric.value === "number" && metric.value % 1 === 0
              ? metric.value.toLocaleString()
              : metric.value.toFixed(1)}
          </p>
          {metric.previousValue && (
            <div className="flex items-center mt-1">
              {getTrendIcon(metric.trend)}
              <span
                className={`text-sm ml-1 ${getTrendColor(metric.trend).text}`}
              >
                {getPercentageChange(metric.value, metric.previousValue)}%
              </span>
            </div>
          )}
        </div>

        <div className="h-16 w-24">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={generateTrendData(metric.value, metric.previousValue)}
            >
              <defs>
                <linearGradient
                  id={`gradient-${index}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={getTrendColor(metric.trend).gradient[0]}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={getTrendColor(metric.trend).gradient[1]}
                    stopOpacity={0.2}
                  />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke={getTrendColor(metric.trend).stroke}
                strokeWidth={2}
                fillOpacity={1}
                fill={`url(#gradient-${index})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// Optional: Enhanced version with loading state and error handling
export const MetricCardWithState = ({
  metric,
  index,
  isLoading = false,
  error = null,
}: MetricCardProps & {
  isLoading?: boolean;
  error?: string | null;
}) => {
  if (isLoading) {
    return (
      <div className="bg-white p-4 rounded-lg border border-gray-100 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-16 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-4 rounded-lg border border-red-200">
        <div className="flex items-center text-red-500 mb-2">
          <ExclamationTriangleIcon className="w-4 h-4 mr-2" />
          <h3 className="text-sm font-medium">Error Loading Metric</h3>
        </div>
        <p className="text-sm text-red-400">{error}</p>
      </div>
    );
  }

  return <MetricCard metric={metric} index={index} />;
};

// Optional: Custom hooks for metric calculations
export const useMetricCalculations = () => {
  const calculateTrend = (
    current: number,
    previous: number
  ): "up" | "down" | "neutral" => {
    const difference = current - previous;
    if (difference > 0) return "up";
    if (difference < 0) return "down";
    return "neutral";
  };

  const formatMetricValue = (
    value: number,
    type: "percentage" | "number" | "decimal"
  ) => {
    switch (type) {
      case "percentage":
        return `${value.toFixed(1)}%`;
      case "decimal":
        return value.toFixed(2);
      default:
        return value.toLocaleString();
    }
  };

  return {
    calculateTrend,
    formatMetricValue,
  };
};
