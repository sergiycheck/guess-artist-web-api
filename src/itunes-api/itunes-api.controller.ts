import { ItunesApiService } from './itunes-api.service.js';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { SearchProps } from './dtos.dto.js';
import got from 'got';

@ApiTags('itunes-api')
@Controller('itunes-api')
export class ItunesApiController {
  constructor(private readonly itunesService: ItunesApiService) {}

  @Get('search')
  search(@Query() dto: SearchProps) {
    return this.itunesService.search(dto);
  }

  @Get('anyting')
  async anything() {
    const url = 'https://httpbin.org/anything';
    const data = await got.get(url).json();
    return data;
  }
}
