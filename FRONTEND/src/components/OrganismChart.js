import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import osdrStudies from '../data/osdr_studies.json';

const OrganismChart = () => {
  const chartData = useMemo(() => {
    const counts = osdrStudies.reduce((acc, study) => {
      const organism = study?.Organism || 'Unknown';
      acc[organism] = (acc[organism] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  return (
    <div className="bg-gray-800 rounded-lg p-6 m-4 shadow-xl border border-gray-700">
      <h3 className="text-xl font-semibold text-white mb-4">Studies by Organism</h3>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 24, bottom: 60, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="name"
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#374151' }}
              angle={-45}
              textAnchor="end"
              interval={0}
              height={70}
            />
            <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={{ stroke: '#374151' }}>
              <Label value="No. of Experiments" angle={-90} offset={15} position="insideLeft" fill="#9CA3AF" style={{ textAnchor: 'middle' }} />
            </YAxis>
            <Tooltip cursor={{ stroke: '#374151' }} />
            <Legend wrapperStyle={{ color: '#D1D5DB' }} />
            <Bar dataKey="count" name="Organism" fill="#06b6d4" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OrganismChart;


