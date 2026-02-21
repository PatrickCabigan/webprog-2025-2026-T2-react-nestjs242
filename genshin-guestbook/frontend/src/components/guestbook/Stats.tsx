import React from 'react';
import { Stats as StatsType } from '../../types';

interface StatsProps {
  stats: StatsType | null;
}

const Stats: React.FC<StatsProps> = ({ stats }) => {
  if (!stats) return null;

  const statItems = [
    { label: 'Total Messages', value: stats.totalEntries, icon: '📜' },
    { label: 'Total Likes', value: stats.totalLikes, icon: '❤️' },
    { label: 'Avg Likes', value: stats.averageLikes, icon: '⭐' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {statItems.map((item, index) => (
        <div
          key={item.label}
          className="bg-gradient-to-br from-genshin-purple/20 to-genshin-teal/20 rounded-xl p-6 text-center"
        >
          <div className="text-3xl mb-2">{item.icon}</div>
          <div className="text-2xl font-bold text-genshin-gold">{item.value}</div>
          <div className="text-sm text-gray-400">{item.label}</div>
        </div>
      ))}
    </div>
  );
};

export default Stats;