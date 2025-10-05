import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import osdrStudies from '../OSDR/osdr_studies.json';

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
    <div className="bg-gradient-to-br from-slate-900 to-gray-800 rounded-xl p-6 m-4 shadow-2xl border border-gray-600 backdrop-blur-sm">
      <h3 className="text-2xl font-bold  bg-cosmos-gradient bg-clip-text text-[#6366f1] mb-2">Studies by Organism</h3>
      <p className="text-gray-300 text-sm mb-6">Distribution of OSDR studies across different organisms</p>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, bottom: 70, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" vertical={false} />
            <XAxis
              dataKey="name"
              stroke="#cbd5e0"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#6366f1' }}
              angle={-45}
              textAnchor="end"
              interval={0}
              height={80}
            />
            <YAxis stroke="#cbd5e0" fontSize={12} tickLine={false} axisLine={{ stroke: '#6366f1' }} allowDecimals={false}>
              <Label value="No. of Studies" angle={-90} offset={15} position="insideLeft" fill="#6366f1" style={{ textAnchor: 'middle' }} />
            </YAxis>
            <Tooltip 
              cursor={false}
              contentStyle={{ 
                backgroundColor: '#1a202c', 
                border: '1px solid #4a5568', 
                borderRadius: '8px',
                color: '#6366f1'
              }}
            />
            <Legend wrapperStyle={{ color: '#e2e8f0', paddingTop: '10px' }} />
            <Bar dataKey="count" name="Studies" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OrganismChart;


