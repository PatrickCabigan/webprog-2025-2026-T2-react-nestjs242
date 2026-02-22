import { Controller, Get, Post, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { GuestbookService } from './guestbook.service';
import { CreateEntryDto } from './dto/create-entry.dto';

@Controller('guestbook')
export class GuestbookController {
  constructor(private readonly guestbookService: GuestbookService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createEntryDto: CreateEntryDto) {
    const entry = await this.guestbookService.create(createEntryDto);
    return {
      success: true,
      message: 'Your message has been left in the guestbook! ✨',
      data: entry,
    };
  }

  @Get()
  async findAll(@Query('page') page = '1', @Query('limit') limit = '20') {
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 20;
    
    const result = await this.guestbookService.findAll(pageNum, limitNum);
    
    return {
      success: true,
      data: result.data,
      meta: {
        total: result.total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(result.total / limitNum),
      },
    };
  }

  @Get('stats')
  async getStats() {
    const stats = await this.guestbookService.getStats();
    return {
      success: true,
      data: stats,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const entry = await this.guestbookService.findOne(id);
    return {
      success: true,
      data: entry,
    };
  }

  @Post(':id/like')
  async like(@Param('id') id: string) {
    const result = await this.guestbookService.likeEntry(id);
    return {
      success: true,
      message: 'Thanks for the like! ❤️',
      data: result,
    };
  }
}