import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const item = payload[0];
    return (
      <div className="p-3 rounded-lg border border-gray-600 bg-gray-900 shadow-lg">
        <div className="text-xs text-gray-400">Year</div>
        <div className="text-sm font-semibold text-white mb-2">{label}</div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
          <span className="text-sm text-gray-200">Publications:</span>
          <span className="text-sm font-bold text-[#6366f1]">{item.value}</span>
        </div>
      </div>
    );
  }
  return null;
};

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
    <div className="bg-gray-800 rounded-lg p-6 m-4 shadow-xl border border-gray-700">
      <h3 className="text-xl font-semibold text-white mb-4">Publications by Time</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 24, bottom: 10, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={true} />
            <XAxis 
              dataKey="year" 
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#6366f1' }}
            >
              <Label value="Years" offset={-10} position="insideBottom" fill="#6366f1" />
            </XAxis>
            <YAxis 
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#6366f1' }}
            >
              <Label value="No. of Research Papers" angle={-90} offset={15} position="insideLeft" fill="#6366f1" style={{ textAnchor: 'middle' }} />
            </YAxis>
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#6366f1' }} />
            <Line 
              type="monotone" 
              dataKey="publications" 
              stroke="#6366f1" 
              strokeWidth={3}
              dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#ffffff', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="text-sm text-gray-400 mt-2">Hover for details.</p>
    </div>
  );
};

export default TrendChart;
