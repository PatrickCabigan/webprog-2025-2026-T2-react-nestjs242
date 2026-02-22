import { Module } from '@nestjs/common';
import { GuestbookService } from './guestbook.service';
import { GuestbookController } from './guestbook.controller';
import { SupabaseConfig } from '../config/supabase.config';

@Module({
  controllers: [GuestbookController],
  providers: [GuestbookService, SupabaseConfig],
})
export class GuestbookModule {}