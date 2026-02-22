import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { SupabaseConfig } from '../config/supabase.config';
import { CreateEntryDto } from './dto/create-entry.dto';
import { GuestbookEntry } from './interfaces/guestbook.interface';

@Injectable()
export class GuestbookService {
  constructor(private supabaseConfig: SupabaseConfig) {}

  async create(createEntryDto: CreateEntryDto): Promise<GuestbookEntry> {
    const supabase = this.supabaseConfig.getAdminClient();
    
    const { data, error } = await supabase
      .from('guestbook_entries')
      .insert([{
        username: createEntryDto.username.trim(),
        message: createEntryDto.message.trim(),
        character_name: createEntryDto.character_name?.trim() || null,
        region: createEntryDto.region || null,
      }])
      .select()
      .single();

    if (error) throw new BadRequestException(error.message);
    return data;
  }

  async findAll(page: number = 1, limit: number = 20) {
    const supabase = this.supabaseConfig.getAdminClient();
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { count, error: countError } = await supabase
      .from('guestbook_entries')
      .select('*', { count: 'exact', head: true });

    if (countError) throw new BadRequestException(countError.message);

    const { data, error } = await supabase
      .from('guestbook_entries')
      .select('*')
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) throw new BadRequestException(error.message);
    
    return {
      data: data || [],
      total: count || 0,
    };
  }

  async findOne(id: string): Promise<GuestbookEntry> {
    const supabase = this.supabaseConfig.getAdminClient();
    
    const { data, error } = await supabase
      .from('guestbook_entries')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) throw new NotFoundException('Entry not found');
    return data;
  }

  async likeEntry(id: string): Promise<{ likes: number }> {
    const supabase = this.supabaseConfig.getAdminClient();
    
    const { data, error } = await supabase
      .rpc('increment_likes', { entry_id: id });

    if (error) throw new BadRequestException(error.message);
    return { likes: data };
  }

  async getStats() {
    const supabase = this.supabaseConfig.getAdminClient();
    
    const { count: totalEntries, error: countError } = await supabase
      .from('guestbook_entries')
      .select('*', { count: 'exact', head: true });

    if (countError) throw new BadRequestException(countError.message);

    const { data: likesData, error: likesError } = await supabase
      .from('guestbook_entries')
      .select('likes');

    if (likesError) throw new BadRequestException(likesError.message);

    const totalLikes = likesData?.reduce((sum, entry) => sum + (entry.likes || 0), 0) || 0;
    const safeTotalEntries = totalEntries || 0;

    return {
      totalEntries: safeTotalEntries,
      totalLikes,
      averageLikes: safeTotalEntries > 0 ? (totalLikes / safeTotalEntries).toFixed(2) : '0',
    };
  }
}