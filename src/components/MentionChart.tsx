import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MentionData } from '../types';

interface MentionChartProps {
  data: MentionData[];
}

const MentionChart: React.FC<MentionChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis 
          dataKey="timestamp" 
          tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()} 
          stroke="#9CA3AF"
        />
        <YAxis stroke="#9CA3AF" />
        <Tooltip
          contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '0.375rem' }}
          labelStyle={{ color: '#D1D5DB' }}
          itemStyle={{ color: '#10B981' }}
        />
        <Line type="monotone" dataKey="count" stroke="#10B981" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MentionChart;