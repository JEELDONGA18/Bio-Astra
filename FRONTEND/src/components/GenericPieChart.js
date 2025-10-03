import React, { useMemo, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import dataSource from '../data/osdr_studies.json';

const COLORS = [
  '#6366f1',
  '#14b8a6',
  '#3b82f6',
  '#06b6d4',
  '#8b5cf6',
  '#0ea5e9',
  '#22c55e',
  '#f59e0b',
  '#ef4444',
  '#e11d48',
  '#10b981',
  '#f97316',
];

const labelOptions = ['OSD', 'Title', 'Assay', 'Organism', 'Tissue', 'Factor'];

function CustomLegend({ items }) {
  return (
    <div className="mt-4 border border-gray-700 rounded p-3 bg-gray-900/60">
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center text-sm text-gray-200">
            <span
              className="inline-block w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: item.color }}
            />
            <span className="mr-1">{item.category}</span>
            <span className="text-gray-400">({item.count})</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GenericPieChart() {
  const [labelField, setLabelField] = useState('Organism');

  const { chartData, legendItems } = useMemo(() => {
    const counts = {};
    for (const row of dataSource) {
      const rawLabel = row?.[labelField];
      if (!rawLabel || typeof rawLabel !== 'string') {
        const key = String(rawLabel || 'Unknown');
        counts[key] = (counts[key] || 0) + 1;
        continue;
      }
      // Split multi-value fields like Factor: "infection,spaceflight"
      const items = rawLabel.split(',').map(s => s.trim()).filter(Boolean);
      if (items.length === 0) {
        const key = 'Unknown';
        counts[key] = (counts[key] || 0) + 1;
      } else {
        for (const item of items) {
          counts[item] = (counts[item] || 0) + 1;
        }
      }
    }
    const sorted = Object.entries(counts)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count);

    const legend = sorted.map((d, i) => ({ ...d, color: COLORS[i % COLORS.length] }));

    return { chartData: sorted, legendItems: legend };
  }, [labelField]);

  return (
    <div className="bg-gray-800 rounded-lg p-6 m-4 shadow-xl border border-gray-700">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">Generate pie chart by fields</h2>
          <p className="text-gray-300 text-sm">➡️ Choose a field to generate a pie chart.</p>
          <p className="text-gray-300 text-sm">➡️ Hover over pie chart to get Infor of area of the pie chart.</p>

        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <label className="block text-gray-300 text-sm mb-1">Fields</label>
            <select
              className="bg-gray-900 border border-gray-700 rounded px-3 py-2 text-gray-200"
              value={labelField}
              onChange={(e) => setLabelField(e.target.value)}
            >
              {labelOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={chartData} dataKey="count" nameKey="category" cx="50%" cy="50%" innerRadius={50} outerRadius={110}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip cursor={{ fill: 'rgba(55,65,81,0.3)' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <CustomLegend items={legendItems} />
    </div>
  );
}


