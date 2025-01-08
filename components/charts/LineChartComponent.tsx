import { GraphData } from '@/types';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface LineChartProps {
  data: GraphData[];
}

export const LineChartComponent = ({ data }: LineChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
        <XAxis dataKey="name" tick={{ fill: '#666' }} tickLine={{ stroke: '#666' }} />
        <YAxis tick={{ fill: '#666' }} tickLine={{ stroke: '#666' }} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="views"
          stroke="#2563eb"
          strokeWidth={2}
          dot={{ fill: '#2563eb', strokeWidth: 2 }}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};