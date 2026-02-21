import { useState, useEffect } from 'react';
import { guestbookApi } from '../services/api';
import { GuestbookEntry, CreateEntryDto, Stats } from '../types';
import toast from 'react-hot-toast';

export const useGuestbook = () => {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch entries
  const fetchEntries = async (pageNum = page) => {
    try {
      const response = await guestbookApi.getEntries(pageNum, 10);
      if (pageNum === 1) {
        setEntries(response.data);
      } else {
        setEntries(prev => [...prev, ...response.data]);
      }
      setHasMore(response.data.length === 10);
    } catch (error) {
      toast.error('Failed to fetch entries');
    }
  };

  // Fetch stats
  const fetchStats = async () => {
    try {
      const response = await guestbookApi.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats');
    }
  };

  // Load more entries
  const loadMore = () => {
    if (hasMore) {
      setPage(prev => prev + 1);
    }
  };

  // Create new entry
  const createEntry = async (data: CreateEntryDto) => {
    try {
      const response = await guestbookApi.createEntry(data);
      setEntries(prev => [response.data, ...prev]);
      toast.success('Message left successfully! ✨');
      fetchStats();
      return true;
    } catch (error: any) {
      toast.error(error.message || 'Failed to create entry');
      return false;
    }
  };

  // Like an entry
  const likeEntry = async (id: string) => {
    try {
      const response = await guestbookApi.likeEntry(id);
      setEntries(prev =>
        prev.map(entry =>
          entry.id === id ? { ...entry, likes: response.data.likes } : entry
        )
      );
      toast.success('Thanks for the like! ❤️');
    } catch (error) {
      toast.error('Failed to like entry');
    }
  };

  // Initial load
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchEntries(1), fetchStats()]);
      setLoading(false);
    };
    loadData();
  }, []);

  // Load more when page changes
  useEffect(() => {
    if (page > 1) {
      fetchEntries(page);
    }
  }, [page]);

  return {
    entries,
    stats,
    loading,
    hasMore,
    loadMore,
    createEntry,
    likeEntry,
  };
};