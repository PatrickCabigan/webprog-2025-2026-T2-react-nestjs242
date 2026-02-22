import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { GuestbookEntry } from '../../types';
import { HeartIcon } from '@heroicons/react/24/outline';

interface EntryCardProps {
  entry: GuestbookEntry;
  onLike: (id: string) => void;
}

const EntryCard: React.FC<EntryCardProps> = ({ entry, onLike }) => {
  const getRegionColor = (region?: string) => {
    switch (region) {
      case 'Mondstadt': return 'bg-blue-500/20 text-blue-300';
      case 'Liyue': return 'bg-yellow-500/20 text-yellow-300';
      case 'Inazuma': return 'bg-purple-500/20 text-purple-300';
      case 'Sumeru': return 'bg-green-500/20 text-green-300';
      case 'Fontaine': return 'bg-cyan-500/20 text-cyan-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <div className="card animate-slide-up">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-xl font-genshin text-genshin-gold">
            {entry.username}
          </h3>
          <p className="text-sm text-gray-400">
            {formatDistanceToNow(new Date(entry.created_at), { addSuffix: true })}
          </p>
        </div>
        {entry.region && (
          <span className={`px-3 py-1 rounded-full text-sm ${getRegionColor(entry.region)}`}>
            {entry.region}
          </span>
        )}
      </div>

      <p className="text-gray-200 mb-4">{entry.message}</p>

      {entry.character_name && (
        <div className="mb-4 inline-block px-3 py-1 bg-genshin-purple/20 rounded-full">
          <span className="text-sm text-genshin-purple">
            Favorite: {entry.character_name}
          </span>
        </div>
      )}

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
        <button
          onClick={() => onLike(entry.id)}
          className="flex items-center gap-2 text-gray-400 hover:text-genshin-gold transition-colors"
        >
          <HeartIcon className="w-5 h-5" />
          <span>{entry.likes} likes</span>
        </button>
      </div>
    </div>
  );
};

export default EntryCard;