import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';

interface PerformanceChartProps {
  performance: {
    costEfficiency: number;
    responseQuality: number;
    averageLatency: number;
  };
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ performance }) => {
  const data = [
    { subject: 'Cost Efficiency', value: performance.costEfficiency * 100 },
    { subject: 'Response Quality', value: performance.responseQuality * 100 },
    { subject: 'Latency', value: performance.averageLatency * 100 },
  ];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <RadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <Radar
          name="Performance"
          dataKey="value"
          stroke="#ec4899"
          fill="#ec4899"
          fillOpacity={0.5}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default PerformanceChart;