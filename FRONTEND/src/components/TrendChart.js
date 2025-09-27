import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TrendChart = ({ data }) => {
  // Sample data for demonstration
  const sampleData = [
      { year: 2010, publications: 10 },
      { year: 2011, publications: 12 },
      { year: 2012, publications: 13 },
      { year: 2013, publications: 23 },
      { year: 2014, publications: 32 },
      { year: 2015, publications: 30 },
      { year: 2016, publications: 23 },
      { year: 2017, publications: 47 },
      { year: 2018, publications: 45 },
      { year: 2019, publications: 37 },
      { year: 2020, publications: 54 },
      { year: 2021, publications: 61 },
      { year: 2022, publications: 57 },
      { year: 2023, publications: 49 },
      { year: 2024, publications: 114 },
  ];

  const chartData = data || sampleData;

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white mb-4">Publication Trends Over Time</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="year" 
              stroke="#9CA3AF"
              fontSize={12}
            />
            <YAxis 
              stroke="#9CA3AF"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F9FAFB'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="publications" 
              stroke="#06b6d4" 
              strokeWidth={3}
              dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#06b6d4', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="text-sm text-gray-400 mt-2">
        Interactive chart showing NASA Space Biology publication trends. 
        Click and drag to zoom, hover for details.
      </p>
    </div>
  );
};

export default TrendChart;
