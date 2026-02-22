export interface GuestbookEntry {
  id: string;
  username: string;
  message: string;
  character_name?: string;
  region?: string;
  likes: number;
  created_at: Date;
  updated_at: Date;
}