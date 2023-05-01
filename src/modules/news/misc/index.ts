import { News } from '../../../common/entities';

export enum ThumbnailsFindValue {
  TRUE = 'true',
  FALSE = 'false',
}

export type FindQueryDto = {
  q: string;
  withThumbnails: ThumbnailsFindValue;
  pageNumber: number;
  pageSize: number;
};

export type FindNewsResponse = {
  _types: 'news';
  didUMean: string;
  totalCount: number;
  relatedSearch: [];
  value: News[];
};
