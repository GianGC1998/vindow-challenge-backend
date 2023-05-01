import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NextFunction, Request, Response } from 'express';
import { MongoRepository } from 'typeorm';
import { Apikeys } from '../entities/api-key.entity';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Apikeys)
    private rapidAPIHeaderRepository: MongoRepository<Apikeys>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const rapidAPIKey = req.headers['x-rapidapi-key']?.toString();
    const rapidAPIHost = req.headers['x-rapidapi-host']?.toString();

    if (!rapidAPIKey || !rapidAPIHost) {
      return res.status(400).json({
        message: 'Missing RapidAPI headers',
      });
    }

    const header = await this.rapidAPIHeaderRepository.findOneBy({
      where: { key: rapidAPIKey, host: rapidAPIHost },
    });

    if (!header) {
      return res.status(401).json({
        message: 'Invalid RapidAPI headers',
      });
    }

    next();
  }
}
