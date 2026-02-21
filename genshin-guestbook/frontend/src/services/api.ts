import axios from 'axios';
import { GuestbookEntry, CreateEntryDto, ApiResponse, Stats } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const guestbookApi = {
  // Get all entries
  getEntries: async (page = 1, limit = 20): Promise<ApiResponse<GuestbookEntry[]>> => {
    const response = await api.get(`/guestbook?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Create new entry
  createEntry: async (data: CreateEntryDto): Promise<ApiResponse<GuestbookEntry>> => {
    const response = await api.post('/guestbook', data);
    return response.data;
  },

  // Like an entry
  likeEntry: async (id: string): Promise<ApiResponse<{ likes: number }>> => {
    const response = await api.post(`/guestbook/${id}/like`);
    return response.data;
  },

  // Get stats
  getStats: async (): Promise<ApiResponse<Stats>> => {
    const response = await api.get('/guestbook/stats');
    return response.data;
  },
};

export default api;