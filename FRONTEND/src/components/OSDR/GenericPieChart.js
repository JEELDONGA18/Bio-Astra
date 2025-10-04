import React, { useMemo, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import dataSource from '../OSDR/osdr_studies.json';

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

function CustomLegend({ items, showAll, onToggle }) {
  const displayItems = showAll ? items : items.slice(0, 10);
  const hasMore = items.length > 10;

  return (
    <div className="mt-4 border border-gray-600 rounded-lg p-4 bg-gradient-to-r from-gray-900 to-slate-800 backdrop-blur-sm">
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {displayItems.map((item, idx) => (
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
{hasMore && (
  <a
    href="#"
    onClick={(e) => {
      e.preventDefault(); // prevent page scroll/reload
      onToggle();         // trigger your existing toggle function
    }}
    className="mt-3 inline-block text-sm text-blue-600 hover:text-blue-300 underline transition-colors duration-200"
  >
    {showAll ? 'Show Less' : 'Show More'}
  </a>
)}
</div>

  );
}

export default function GenericPieChart() {
  const [labelField, setLabelField] = useState('Organism');
  const [showAllLegend, setShowAllLegend] = useState(false);

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
    <div className="bg-gradient-to-br from-slate-900 to-gray-800 rounded-xl p-6 m-4 shadow-2xl border border-gray-600 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold bg-cosmos-gradient bg-clip-text text-transparent mb-2">Generate Pie Chart by Fields</h2>
          <div className="text-sm space-y-1">
            <p className="text-gray-300">✨ Choose a field to generate a pie chart</p>
            <p className="text-gray-300">🖱️ Hover over pie chart to get detailed information</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
          <div>
            <label className="block text-gray-300 text-sm mb-2 font-medium">Fields</label>
            <select
              className="bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
            <Tooltip 
              cursor={{ fill: 'rgba(74,85,104,0.3)' }}
              contentStyle={{ 
                backgroundColor: '#1a202c', 
                border: '1px solid #4a5568', 
                borderRadius: '8px',
                color: '#e2e8f0'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <CustomLegend 
        items={legendItems} 
        showAll={showAllLegend} 
        onToggle={() => setShowAllLegend(!showAllLegend)} 
      />
    </div>
  );
}


