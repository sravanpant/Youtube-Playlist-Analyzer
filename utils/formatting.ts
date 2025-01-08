export const formatViews = (views: number): string => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };
  
  export const CHART_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  
  export const generateTrendData = (current: number, previous: number | undefined) => {
    if (!previous) return [];
    return [
      { value: previous * 0.8 },
      { value: previous * 0.9 },
      { value: previous },
      { value: previous * 1.1 },
      { value: current }
    ];
  };