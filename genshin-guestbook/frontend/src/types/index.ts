export interface GuestbookEntry {
  id: string;
  username: string;
  message: string;
  character_name?: string;
  region?: string;
  likes: number;
  created_at: string;
  updated_at: string;
}

export interface CreateEntryDto {
  username: string;
  message: string;
  character_name?: string;
  region?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface Stats {
  totalEntries: number;
  totalLikes: number;
  averageLikes: string;
}

export const GENSHIN_REGIONS = [
  'Mondstadt', 'Liyue', 'Inazuma', 'Sumeru', 'Fontaine', 'Natlan', 'Snezhnaya'
] as const;

export const GENSHIN_CHARACTERS = [
  'Venti', 'Zhongli', 'Raiden Shogun', 'Nahida', 'Furina', 'Hu Tao', 'Ganyu',
  'Xiao', 'Kamisato Ayaka', 'Yoimiya', 'Klee', 'Diluc', 'Jean', 'Keqing',
  'Mona', 'Qiqi', 'Childe', 'Albedo', 'Eula', 'Kazuha', 'Shenhe', 'Yae Miko',
  'Ayato', 'Cyno', 'Nilou', 'Tighnari', 'Dehya', 'Alhaitham', 'Wanderer',
  'Baizhu', 'Lynette', 'Lyney', 'Neuvillette', 'Wriothesley', 'Clorinde',
  'Arlecchino', 'Sigewinne', 'Emilie', 'Mavuika', 'Xilonen', 'Chasca'
].sort();