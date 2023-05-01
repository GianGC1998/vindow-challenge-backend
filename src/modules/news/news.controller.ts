import { Controller, Get, Query } from '@nestjs/common';
import { FindQueryDto } from './misc';
import { NewsService } from './news.service';

@Controller('search')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('NewsSearchAPI')
  findAll(@Query() query: FindQueryDto) {
    return this.newsService.findAll(query);
  }
}
