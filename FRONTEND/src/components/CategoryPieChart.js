import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const p = payload[0]?.payload || {};
    return (
      <div className="p-3 rounded-lg border border-gray-600 bg-gray-900 shadow-lg">
        <div className="text-xs text-gray-400">Category</div>
        <div className="text-sm font-semibold text-white mb-2">{p.category}</div>
        <div className="text-sm text-gray-200">Papers: <span className="font-bold text-cosmos-cyan">{p.count}</span></div>
      </div>
    );
  }
  return null;
};

const COLORS = [
  '#06b6d4', '#8b5cf6', '#22c55e', '#f59e0b', '#ef4444', '#3b82f6', '#a855f7', '#10b981', '#eab308', '#f97316',
  '#14b8a6', '#6366f1', '#84cc16', '#e11d48', '#0ea5e9'
];

const CategoryPieChart = ({ data }) => {
  const sampleData = [
    { category: 'Animal Studies', count: 93 },
    { category: 'Human & Human Cell Studies', count: 86 },
    { category: 'Plant Studies', count: 76 },
    { category: 'Microbial Studies', count: 35 },
    { category: 'Cross-Cutting Themes & Technologies', count: 317 },
  ];
  const chartData = Array.isArray(data) && data.length ? data : sampleData;

  return (
    <div className="bg-gray-800 rounded-lg p-6 m-4 shadow-xl border border-gray-700">
      <h3 className="text-xl font-semibold text-white mb-4">Publications by Category</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="category"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={100}
              label={({ percent, payload }) => `${(payload && payload.category) ? payload.category : ''} ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" height={24} wrapperStyle={{ color: '#D1D5DB' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryPieChart;


