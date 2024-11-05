// components/interfaceComponents/graphic.tsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, PieChart, Pie, Legend } from 'recharts';

interface GenericChartProps {
  data: any[];
  dataKey: string;
  xAxisKey: string;
  chartType: 'line' | 'bar' | 'pie';
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  pieLabelKey?: string;
}

const GenericChart: React.FC<GenericChartProps> = ({ data, dataKey, xAxisKey, chartType, title, xAxisLabel, yAxisLabel, pieLabelKey }) => {
  console.log('Data received for chart:', data); 

  if (!data || data.length === 0) return <div>No data available</div>;

  switch (chartType) {
    case 'line':
      return (
        <LineChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisKey} />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey={dataKey} stroke="#8884d8" />
        </LineChart>
      );
    case 'bar':
      return (
        <BarChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisKey} />
          <YAxis />
          <Tooltip />
          <Bar dataKey={dataKey} fill="#8884d8" />
        </BarChart>
      );
    case 'pie':
      return (
        <PieChart width={500} height={300}>
          <Tooltip />
          <Pie data={data} dataKey={dataKey} nameKey={pieLabelKey} outerRadius={80} fill="#8884d8" label />
        </PieChart>
      );
    default:
      return <div>Unsupported chart type</div>;
  }
};

export default GenericChart;
