// components/common/ChartTabs.tsx
import { GraphData } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChartComponent } from "../charts/LineChartComponent";
import { AreaChartComponent } from "../charts/AreaChartComponent";
import { BarChartComponent } from "../charts/BarChartComponent";

interface ChartTabsProps {
  graphData: GraphData[];
}

export const ChartTabs = ({ graphData }: ChartTabsProps) => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">
          Analytics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="line" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="line">Line Chart</TabsTrigger>
            <TabsTrigger value="area">Area Chart</TabsTrigger>
            <TabsTrigger value="bar">Bar Chart</TabsTrigger>
          </TabsList>

          <TabsContent value="line">
            <LineChartComponent data={graphData} />
          </TabsContent>

          <TabsContent value="area">
            <AreaChartComponent data={graphData} />
          </TabsContent>

          <TabsContent value="bar">
            <BarChartComponent data={graphData} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
