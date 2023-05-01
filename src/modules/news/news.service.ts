import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { News } from '../../common/entities';
import { PaginationHelper, throwException } from '../../common/helpers';
import { FindNewsResponse, FindQueryDto, ThumbnailsFindValue } from './misc';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: MongoRepository<News>,
  ) {}

  async findAll(query: FindQueryDto): Promise<FindNewsResponse> {
    try {
      const pagination = PaginationHelper.getSkipAndTake(
        query.pageNumber,
        query.pageSize,
      );

      if (!query.q || !query.q.trim()) query.q = '';

      const includeThumbnails =
        query.withThumbnails === ThumbnailsFindValue.TRUE;

      const selectNews = [
        'id',
        'title',
        'url',
        'description',
        'body',
        ...(includeThumbnails ? ['image'] : []),
      ];

      const whereOptions = {
        $or: [
          { title: { $regex: query.q, $options: 'i' } },
          { url: { $regex: query.q, $options: 'i' } },
          { description: { $regex: query.q, $options: 'i' } },
          { body: { $regex: query.q, $options: 'i' } },
        ],
      };
      const [total, data] = await Promise.all([
        this.newsRepository.countBy({
          ...whereOptions,
        }),
        this.newsRepository.find({
          select: selectNews as (keyof News)[],
          where: whereOptions,
          skip: Number(pagination.skip),
          take: Number(pagination.take),
        }),
      ]);

      return {
        _types: 'news',
        didUMean: '',
        totalCount: total,
        relatedSearch: [],
        value: data,
      };
    } catch (error) {
      throwException(
        __filename,
        'findAll',
        error,
        'An error occurred at retrieving the news. Please, contact to support',
      );
    }
  }
}
