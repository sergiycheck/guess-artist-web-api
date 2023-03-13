import { ItunesApiService } from './itunes-api.service.js';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import {
  PredefinedArtistsEnum,
  PredefinedArtistsSearchProps,
  SearchProps,
  TopCountry,
} from './dtos/search-dtos.dto.js';

@ApiTags('itunes-api')
@Controller('itunes-api')
export class ItunesApiController {
  constructor(private readonly itunesService: ItunesApiService) {}

  @Get('search')
  search(@Query() dto: SearchProps) {
    return this.itunesService.search(dto);
  }

  @Get('albums-by-artist')
  async albumsByArtist(@Query() dto: SearchProps) {
    return this.itunesService.getAlbumsByArtist(dto);
  }

  @ApiQuery({ name: 'term', enum: PredefinedArtistsEnum })
  @ApiQuery({ name: 'country', enum: TopCountry })
  @Get('albums-by-predefined-artist')
  async albumsByPredefinedArtist(@Query() dto: PredefinedArtistsSearchProps) {
    return this.itunesService.getAlbumsByArtist(dto);
  }
}
