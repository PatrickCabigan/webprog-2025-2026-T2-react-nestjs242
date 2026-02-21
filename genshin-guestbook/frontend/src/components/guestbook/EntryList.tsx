import React from 'react';
import EntryCard from './EntryCard';
import { GuestbookEntry } from '../../types';
import Button from '../ui/Button';

interface EntryListProps {
  entries: GuestbookEntry[];
  onLike: (id: string) => void;
  hasMore?: boolean;
  onLoadMore?: () => void;
  loading?: boolean;
}

const EntryList: React.FC<EntryListProps> = ({
  entries,
  onLike,
  hasMore,
  onLoadMore,
  loading,
}) => {
  if (entries.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📖</div>
        <h3 className="text-2xl font-genshin text-genshin-gold mb-2">
          The Guestbook is Empty
        </h3>
        <p className="text-gray-400">
          Be the first to leave a message for the Traveler!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <EntryCard
          key={entry.id}
          entry={entry}
          onLike={onLike}
        />
      ))}
      
      {hasMore && (
        <div className="flex justify-center mt-6">
          <Button
            variant="secondary"
            onClick={onLoadMore}
            loading={loading}
          >
            Load More Messages
          </Button>
        </div>
      )}
    </div>
  );
};

export default EntryList;